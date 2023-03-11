const ServerResponse = invoke('GameServer/Network/Response');
const ActorModel     = invoke('GameServer/Model/Actor');
const Automation     = invoke('GameServer/Instance/Automation');
const Skillset       = invoke('GameServer/Instance/Skillset');
const Backpack       = invoke('GameServer/Instance/Backpack');
const DataCache      = invoke('GameServer/DataCache');
const World          = invoke('GameServer/World');
const ConsoleText    = invoke('GameServer/ConsoleText');
const Formulas       = invoke('GameServer/Formulas');
const Database       = invoke('Database');

class Actor extends ActorModel {
    constructor(data) {
        // Parent inheritance
        super(data);

        // Local
        this.automation = new Automation();
        this.skillset   = new Skillset(this);
        this.backpack   = new Backpack(data);
        this.destId     = undefined;

        delete this.model.items;
        delete this.model.paperdoll;

        this.storedAttackData = undefined;
    }

    enterWorld(session) {
        // Calculate accumulated
        this.setCollectiveAll();
        this.setSkillset();

        // Start vitals replenish
        this.automation.replenishVitals(session, this);

        // Show npcs based on radius
        this.updatePosition(session, {
            locX: this.fetchLocX(),
            locY: this.fetchLocY(),
            locZ: this.fetchLocZ(),
            head: this.fetchHead(),
        });

        // Default
        ConsoleText.transmit(session, ConsoleText.caption.welcome);
    }

    destructor() {
        this.automation.destructor();
    }

    moveTo(session, coords) {
        if (this.isBlocked(session)) {
            return;
        }

        // Abort scheduled movement, user redirected the actor
        this.automation.abortAll(this);
        session.dataSend(ServerResponse.moveToLocation(this.fetchId(), coords));
    }

    updatePosition(session, coords) {
        // TODO: Write less in DB about movement
        this.setLocXYZH(coords);
        Database.updateCharacterLocation(this.fetchId(), coords);

        // Render npcs found inside user's radius
        const inRadiusNpcs = World.npc.spawns.filter(ob => Formulas.calcWithinRadius(coords.locX, coords.locY, ob.fetchLocX(), ob.fetchLocY(), 2500)) ?? [];
        inRadiusNpcs.forEach((npc) => {
            session.dataSend(ServerResponse.npcInfo(npc));
        });

        // Reschedule attacks based on updated position
        if (this.destId && this.storedAttackData) {
            if (this.state.fetchAtkMelee()) {
                this.select(session, this.storedAttackData);
            }
            else
            if (this.state.fetchAtkRemote()) {
                this.requestedSkillAction(session, this.storedAttackData);
            }
            this.storedAttackData = undefined;
        }

        // Reschedule smooth pick-up
        if (this.storedPickup) {
            World.fetchItem(this.storedPickup.id).then((item) => {
                this.automation.schedulePickup(session, this, item, () => {
                    session.dataSend(ServerResponse.pickupItem(this.fetchId(), item));
                });
            }).catch((e) => {
                utils.infoWarn('GameServer :: ? -> ' + e);
            });
            this.storedPickup = undefined;
        }
    }

    select(session, data) {
        if (this.fetchId() === data.id) { // Click on self
            this.destId = this.fetchId();
            session.dataSend(ServerResponse.destSelected(data.id));
            return;
        }

        World.fetchNpc(data.id).then((npc) => { // Creature selected
            if (npc.fetchId() !== this.destId) { // First click on a Creature
                this.destId = npc.fetchId();
                session.dataSend(ServerResponse.destSelected(this.destId));
                this.automation.abortAll(this);
                this.statusUpdateVitals(session, npc);
            }
            else { // Second click on same Creature
                if (this.isBlocked(session)) {
                    return;
                }

                // Slot attack data for ValidatePosition verification
                this.storedAttackData = data;
                this.automation.abortScheduledAtkRemote(this);
                this.automation.abortScheduledPickup   (this);

                // Towards attack
                this.automation.scheduleAtkMelee(session, this, npc, 0, () => {
                    if (npc.fetchAttackable() || data.ctrl) {
                        this.meleeHit(session, npc);
                    }
                    else {
                        World.npcTalk(session, npc);
                    }
                });
            }
        }).catch(() => { // Pickup item
            if (this.isBlocked(session)) {
                return;
            }

            if (this.state.fetchPickinUp()) {
                return;
            }

            this.storedPickup = data;
            this.automation.abortScheduledAtkMelee (this);
            this.automation.abortScheduledAtkRemote(this);

            // This will fire a ValidatePosition
            session.dataSend(
                ServerResponse.stopMove(this.fetchId(), {
                    locX: this.fetchLocX(),
                    locY: this.fetchLocY(),
                    locZ: this.fetchLocZ(),
                    head: this.fetchHead(),
                })
            );
        });
    }

    unselect(session) {
        this.destId = undefined;
        session.dataSend(ServerResponse.destDeselected(this));
    }

    requestedSkillAction(session, data) {
        if (this.destId === undefined) {
            return;
        }

        if (this.isBlocked(session)) {
            return;
        }

        World.fetchNpc(this.destId).then((npc) => {
            // Slot attack data for ValidatePosition verification
            this.storedAttackData = data;
            this.automation.abortScheduledAtkMelee(this);
            this.automation.abortScheduledPickup  (this);

            // Towards attack
            this.automation.scheduleAtkRemote(session, this, npc, data.fetchDistance(), () => {
                if (npc.fetchAttackable() || data.fetchCtrl()) { // TODO: Else, find which `response` fails the attack
                    this.remoteHit(session, npc, data);
                }
            });
        }).catch((e) => {
            utils.infoWarn('GameServer :: npc not found (2) -> ' + e);
        });
    }

    basicAction(session, data) {
        if (this.state.inMotion()) {
            return;
        }

        switch (data.actionId) {
        case 0x00: // Sit / Stand
            if (this.state.fetchCasts() || this.state.fetchCombats() || this.state.fetchAnimated()) {
                return;
            }

            this.state.setAnimated(true);
            this.state.setSeated(!this.state.fetchSeated());
            session.dataSend(ServerResponse.sitAndStand(this));

            setTimeout(() => {
                this.state.setAnimated(false);
            }, 2000); // TODO: How to calculate this, based on what?
            break;

        case 0x01: // Walk / Run
            this.state.setWalkin(!this.state.fetchWalkin());
            session.dataSend(
                ServerResponse.walkAndRun(this)
            );
            break;

        case 0x28: // Recommend without selection
            break;

        default:
            utils.infoWarn('GameServer :: unknown basic action 0x%s', utils.toHex(data.actionId));
            break;
        }
    }

    socialAction(session, actionId) {
        if (this.isBlocked(session)) {
            return;
        }

        if (this.state.inMotion()) {
            return;
        }

        this.automation.abortAll(this);
        session.dataSend(ServerResponse.socialAction(this.fetchId(), actionId));
    }

    isBlocked(session) {
        if (this.state.isBlocked()) {
            session.dataSend(ServerResponse.actionFailed());
            return true;
        }
        return false;
    }

    statusUpdateLevelExpSp(session, creature) {
        session.dataSend(
            ServerResponse.statusUpdate(creature.fetchId(), [
                { id: 0x1, value: creature.fetchLevel() },
                { id: 0x2, value: creature.fetchExp  () },
                { id: 0xd, value: creature.fetchSp   () },
            ])
        );
    }

    statusUpdateVitals(session, creature) {
        session.dataSend(
            ServerResponse.statusUpdate(creature.fetchId(), [
                { id: 0x9, value: creature.fetchHp   () },
                { id: 0xa, value: creature.fetchMaxHp() },
                { id: 0xb, value: creature.fetchMp   () },
                { id: 0xc, value: creature.fetchMaxMp() },
            ])
        );
    }

    statusUpdateStats(session, creature) {
        session.dataSend(
            ServerResponse.statusUpdate(creature.fetchId(), [
                { id: 0x11, value: creature.fetchCollectivePAtk  () },
                { id: 0x17, value: creature.fetchCollectiveMAtk  () },
                { id: 0x12, value: creature.fetchCollectiveAtkSpd() },
            ])
        );
    }

    meleeHit(session, npc) {
        if (npc.isDead()) {
            return;
        }

        const speed = 500000 / this.fetchCollectiveAtkSpd();
        session.dataSend(ServerResponse.attack(this, npc.fetchId()));
        this.state.setCombats(true);

        setTimeout(() => {
            this.hitPoint(session, npc, true);
        }, speed * 0.644); // Until hit point

        setTimeout(() => {
            this.state.setCombats(false);
        }, speed); // Until end of combat
    }

    remoteHit(session, npc, data) {
        if (npc.isDead()) {
            return;
        }

        if (this.fetchMp() < data.fetchConsumedMp()) {
            ConsoleText.transmit(session, ConsoleText.caption.depletedMp);
            return;
        }

        session.dataSend(ServerResponse.skillStarted(this, npc.fetchId(), data));
        session.dataSend(ServerResponse.skillDurationBar(data.fetchHitTime()));
        this.state.setCasts(true);

        setTimeout(() => {
            this.setMp(this.fetchMp() - data.fetchConsumedMp());
            this.statusUpdateVitals(session, this);
            this.hitPoint(session, npc, false);
            this.state.setCasts(false);

            // Start replenish
            this.automation.replenishVitals(session, this);

        }, data.fetchHitTime());

        setTimeout(() => {
            // TODO: Prohibit same skill use before reuse time
        }, data.fetchReuseTime());
    }

    hitPoint(session, npc, melee) {
        const power = melee ? this.hitPAtk(this, npc) : this.hitMAtk(this, npc);
        npc.setHp(Math.max(0, npc.fetchHp() - power)); // HP bar would disappear if less than zero

        this.statusUpdateVitals(session, npc);
        ConsoleText.transmit(session, ConsoleText.caption.actorHit, [{ kind: ConsoleText.kind.number, value: power }]);

        if (npc.isDead()) {
            this.rewardExpAndSp(session, npc.fetchRewardExp(), npc.fetchRewardSp());
            World.removeNpc(session, npc);
        }

        session.dataSend(ServerResponse.attack(npc, this.fetchId()));
    }

    hitPAtk(actor, npc) { // TODO: Calculate weapon random hit
        const pAtk = actor.fetchCollectivePAtk();
        return Formulas.calcMeleeHit(pAtk, npc.fetchPDef());
    }

    hitMAtk(actor, npc) {
        const mAtk = actor.fetchCollectiveMAtk();
        return Formulas.calcRemoteHit(mAtk, 12, npc.fetchMDef());
    }

    rewardExpAndSp(session, exp, sp) {
        let totalExp = this.fetchExp() + exp;
        let totalSp  = this.fetchSp () +  sp;

        for (let i = 0; i < 75; i++) {
            if (totalExp >= DataCache.experience[i] && totalExp < DataCache.experience[i + 1]) {
                if (i + 1 > this.fetchLevel()) { // Leveled up
                    this.levelUp(session, i + 1);
                    break;
                }
            }
        }

        this.setExpSp(totalExp, totalSp);
        this.statusUpdateLevelExpSp(session, this);
        ConsoleText.transmit(session, ConsoleText.caption.earnedExpAndSp, [{ kind: ConsoleText.kind.number, value: exp}, { kind: ConsoleText.kind.number, value: sp }]);

        // Update database with new exp, sp
        Database.updateCharacterExperience(this.fetchId(), this.fetchLevel(), totalExp, totalSp);
    }

    levelUp(session, level) {
        // Stop automation to prevent false data
        this.automation.stopReplenish();

        // Update stats
        this.setLevel(level);
        this.setCollectiveAll();
        this.fillupVitals();

        // Level up effect
        session.dataSend(ServerResponse.userInfo(this));
        session.dataSend(ServerResponse.socialAction(this.fetchId(), 15));
        ConsoleText.transmit(session, ConsoleText.caption.levelUp);

        // Update database with new hp, mp
        Database.updateCharacterVitals(this.fetchId(), this.fetchHp(), this.fetchMaxHp(), this.fetchMp(), this.fetchMaxMp());
    }

    teleportTo(session, coords) {
        if (this.isBlocked(session)) {
            return;
        }

        this.automation.abortAll(this);
        session.dataSend(ServerResponse.teleportToLocation(this.fetchId(), coords));

        // Turns out to be a viable solution
        setTimeout(() => {
            this.updatePosition(session, coords);
        }, 1000);
    }

    unstuck(session) {
        this.teleportTo(session, {
            locX: 80304, locY: 56241, locZ: -1500, head: this.fetchHead()
        });
    }

    admin(session) {
        session.dataSend(
            ServerResponse.npcHtml(this.fetchId(), utils.parseRawFile('data/Html/Admin/main.html'))
        );
    }

    setCollectiveTotalHp() {
        const base = Formulas.calcHp(this.fetchLevel(), this.fetchClassId(), this.fetchCon());
        this.setMaxHp(base);
        this.setHp(Math.min(this.fetchHp(), this.fetchMaxHp()));
    }

    setCollectiveTotalMp() { // TODO: Fix hardcoded class transfer parameter
        const base  = Formulas.calcMp(this.fetchLevel(), this.isMystic(), 0, this.fetchMen());
        const bonus = this.backpack.fetchTotalBonusMp();
        this.setMaxMp(base + bonus);
        this.setMp(Math.min(this.fetchMp(), this.fetchMaxMp()));
    }

    setCollectiveTotalLoad() {
        const base = Formulas.calcMaxLoad(this.fetchCon());
        this.setMaxLoad(base);
        this.setLoad(this.backpack.fetchTotalLoad());
    }

    setCollectiveStats() {
        const weapon  = this.backpack.fetchEquippedWeapon();
        const level   = this.fetchLevel();

        const wPAtk   = weapon?.fetchPAtk() ?? this.fetchPAtk();
        const pAtk    = Formulas.calcPAtk(level, this.fetchStr(), wPAtk);
        this.setCollectivePAtk(pAtk);

        const wMAtk   = weapon?.fetchMAtk() ?? this.fetchMAtk();
        const mAtk    = Formulas.calcMAtk(level, this.fetchInt(), wMAtk);
        this.setCollectiveMAtk(mAtk);

        const wAtkSpd = weapon?.fetchAtkSpd() ?? this.fetchAtkSpd();
        const atkSpd  = Formulas.calcAtkSpd(this.fetchDex(), wAtkSpd);
        this.setCollectiveAtkSpd(atkSpd);
    }

    setCollectiveAll() {
        this.setCollectiveTotalHp();
        this.setCollectiveTotalMp();
        this.setCollectiveTotalLoad();
        this.setCollectiveStats();
    }

    setSkillset() {
        this.skillset.populate();
    }
}

module.exports = Actor;
