const ServerResponse = invoke('GameServer/Network/Response');
const ActorModel     = invoke('GameServer/Model/Actor');
const Automation     = invoke('GameServer/Instance/Automation');
const Backpack       = invoke('GameServer/Instance/Backpack');
const DataCache      = invoke('GameServer/DataCache');
const World          = invoke('GameServer/World');
const Formulas       = invoke('GameServer/Formulas');
const Database       = invoke('Database');

class Actor extends ActorModel {
    constructor(data) {
        // Parent inheritance
        super(data);

        // Local
        this.automation = new Automation();
        this.backpack   = new Backpack(data);
        this.destId     = undefined;

        delete this.model.items;
        delete this.model.paperdoll;
    }

    enterWorld(session) {
        // Calculate total bonus for HP & MP
        this.setCollectiveTotalHp();
        this.setCollectiveTotalMp();

        // Start vitals replenish
        this.automation.replenishMp(session, this);

        // Show npcs based on radius
        this.updatePosition(session, {
            locX: this.fetchLocX(),
            locY: this.fetchLocY(),
            locZ: this.fetchLocZ(),
            head: this.fetchHead(),
        });
    }

    destructor() {
        this.automation.destructor();
    }

    moveTo(session, coords) {
        if (this.isBusy(session)) {
            return;
        }

        // Abort scheduled movement, user redirected the actor
        this.automation.abortScheduleTimer(this);
        session.dataSend(ServerResponse.moveToLocation(this.fetchId(), coords));
    }

    updatePosition(session, coords) {
        this.setLocXYZH(coords);

        // Render npcs found inside user's radius
        const inRadiusNpcs = World.npc.spawns.filter(ob => Formulas.calcWithinRadius(coords.locX, coords.locY, ob.fetchLocX(), ob.fetchLocY(), 2500)) ?? [];
        inRadiusNpcs.forEach((npc) => {
            session.dataSend(ServerResponse.npcInfo(npc));
        });

         // TODO: Write less in DB about movement
        Database.updateCharacterLocation(this.fetchId(), coords);
    }

    setCollectiveTotalHp() {
        const base = Formulas.calcHp(this.fetchLevel(), this.fetchClassId(), this.fetchCon());
        this.setMaxHp(base);
        this.setHp(Math.min(this.fetchHp(), this.fetchMaxHp()));
    }

    setCollectiveTotalMp() { // TODO: Fix hardcoded class transfer parameter
        const base  = Formulas.calcMp(this.fetchLevel(), this.isMystic(), 0, this.fetchMen());
        const chest = this.backpack.fetchEquippedArmor(10)?.maxMp ?? 0;
        const pants = this.backpack.fetchEquippedArmor(11)?.maxMp ?? 0;
        this.setMaxMp(base + chest + pants);
        this.setMp(Math.min(this.fetchMp(), this.fetchMaxMp()));
    }

    select(session, data, ctrl = false) {
        if (this.fetchId() === data.id) { // Click on self
            this.unselect(session);
            session.dataSend(ServerResponse.destSelected(data.id));
            return;
        }

        World.fetchNpcWithId(data.id).then((npc) => { // Creature selected
            if (npc.fetchId() !== this.destId) { // First click on a Creature
                this.destId = npc.fetchId();
                session.dataSend(ServerResponse.destSelected(this.destId));
                this.statusUpdateVitals(session, npc);
            }
            else { // Second click on same Creature
                if (this.isBusy(session)) {
                    return;
                }

                this.automation.scheduleArrival(session, this, npc, 20, () => {
                    this.updatePosition(session, {
                        locX: npc .fetchLocX(),
                        locY: npc .fetchLocY(),
                        locZ: npc .fetchLocZ(),
                        head: this.fetchHead(),
                    });

                    if (npc.fetchAttackable() || ctrl) {
                        this.meleeHit(session, npc);
                    }
                    else {
                        World.npcTalk(session, npc);
                    }
                });
            }
        }).catch((e) => { // Pickup item
            utils.infoWarn('GameServer:: npc not found (1) -> ' + e);
            this.unselect(session);
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

        if (this.isBusy(session)) {
            return;
        }

        World.fetchNpcWithId(this.destId).then((npc) => {
            this.automation.scheduleArrival(session, this, npc, data.distance, () => {
                if (npc.fetchAttackable() || data.ctrl) { // TODO: Else, find which `response` fails the attack
                    this.remoteHit(session, npc, data);
                }
            });
        }).catch((e) => {
            utils.infoWarn('GameServer:: npc not found (2) -> ' + e);
            this.unselect(session);
        });
    }

    basicAction(session, data) {
        if (this.state.fetchOnTheMove()) {
            return;
        }

        switch (data.actionId) {
        case 0x00: // Sit / Stand
            if (this.state.fetchCasts() || this.state.fetchCombats() || this.state.fetchOccupied()) {
                return;
            }

            this.state.setOccupied(true);
            this.state.setSeated(!this.state.fetchSeated());
            session.dataSend(ServerResponse.sitAndStand(this));

            setTimeout(() => {
                this.state.setOccupied(false);
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
            utils.infoWarn('GameServer:: unknown basic action 0x%s', utils.toHex(data.actionId));
            break;
        }
    }

    socialAction(session, actionId) {
        if (this.isBusy(session)) {
            return;
        }

        if (this.state.fetchOnTheMove()) {
            return;
        }

        this.automation.abortScheduleTimer(this);
        session.dataSend(ServerResponse.socialAction(this.fetchId(), actionId));
    }

    isBusy(session) {
        if (this.state.isBusy()) {
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

    meleeHit(session, npc) {
        if (npc.isDead()) {
            return;
        }

        const speed = 500000 / this.fetchAtkSpd();
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

        if (this.fetchMp() < data.mp) {
            session.dataSend(ServerResponse.consoleText(24));
            return;
        }

        this.automation.abortScheduleTimer(this);
        session.dataSend(ServerResponse.skillStarted(this, npc.fetchId(), data));
        this.state.setCasts(true);

        setTimeout(() => {
            this.setMp(this.fetchMp() - data.mp);
            this.statusUpdateVitals(session, this);
            this.hitPoint(session, npc, false);
            this.state.setCasts(false);

        }, data.hitTime);

        setTimeout(() => {
            // TODO: Prohibit same skill use before reuse time
        }, data.resuseTime);
    }

    hitPoint(session, npc, melee) {
        const power = melee ? this.hitPAtk(this, npc) : this.hitMAtk(this, npc);
        npc.setHp(Math.max(0, npc.fetchHp() - power)); // HP bar would disappear if less than zero

        this.statusUpdateVitals(session, npc);
        session.dataSend(ServerResponse.consoleText(35, [{ value: power }]));

        if (npc.isDead()) {
            this.rewardExpAndSp(session, npc.fetchRewardExp(), npc.fetchRewardSp());
            World.removeNpc(session, npc);
        }
    }

    hitPAtk(actor, npc) {
        const wpnPAtk = actor.backpack.fetchEquippedWeapon()?.pAtk ?? actor.fetchPAtk();
        const pAtk = Formulas.calcPAtk(actor.fetchLevel(), actor.fetchStr(), wpnPAtk);
        return Formulas.calcMeleeHit(pAtk, npc.fetchPDef());
    }

    hitMAtk(actor, npc) {
        const wpnMAtk = actor.backpack.fetchEquippedWeapon()?.mAtk ?? actor.fetchMAtk();
        const mAtk = Formulas.calcMAtk(actor.fetchLevel(), actor.fetchInt(), wpnMAtk);
        return Formulas.calcRemoteHit(mAtk, 12, npc.fetchMDef());
    }

    rewardExpAndSp(session, exp, sp) {
        let totalExp = this.fetchExp() + exp;
        let totalSp  = this.fetchSp () +  sp;

        for (let i = 0; i < 75; i++) {
            if (totalExp >= DataCache.experience[i] && totalExp < DataCache.experience[i + 1]) {
                if (i + 1 > this.fetchLevel()) { // Leveled up
                    this.setLevel(i + 1);
                    this.setCollectiveTotalHp();
                    this.setCollectiveTotalMp();
                    this.fillupVitals();
                    this.statusUpdateVitals(session, this);
        
                    // Level up effect
                    session.dataSend(ServerResponse.socialAction(this.fetchId(), 15));

                    // Update database with new hp, mp
                    Database.updateCharacterVitals(this.fetchId(), this.fetchHp(), this.fetchMaxHp(), this.fetchMp(), this.fetchMaxMp());
                    break;
                }
            }
        }

        this.setExpSp(totalExp, totalSp);
        this.statusUpdateLevelExpSp(session, this);

        // Update database with new exp, sp
        Database.updateCharacterExperience(this.fetchId(), this.fetchLevel(), totalExp, totalSp);
    }

    admin(session) {
        session.dataSend(
            ServerResponse.npcHtml(this.fetchId(), utils.parseRawFile('data/Html/Default/admin.html'))
        );
    }

    unstuck(session) {
        if (this.isBusy(session)) {
            return;
        }

        const coords = {
            locX: 80304, locY: 56241, locZ: -1500, head: this.fetchHead()
        };

        this.automation.abortScheduleTimer(this);
        session.dataSend(ServerResponse.teleportToLocation(this.fetchId(), coords));

        // TODO: Hide this from the world, soon. Utter stupid.
        setTimeout(() => {
            this.updatePosition(session, coords);
        });
    }
}

module.exports = Actor;
