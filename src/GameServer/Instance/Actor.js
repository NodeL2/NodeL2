const ServerResponse = invoke('GameServer/Network/Response');
const ActorModel     = invoke('GameServer/Model/Actor');
const Automation     = invoke('GameServer/Instance/Automation');
const Attack         = invoke('GameServer/Instance/Attack');
const Skillset       = invoke('GameServer/Instance/Skillset');
const Backpack       = invoke('GameServer/Instance/Backpack');
const DataCache      = invoke('GameServer/DataCache');
const World          = invoke('GameServer/World');
const Methods        = invoke('GameServer/Methods');
const ConsoleText    = invoke('GameServer/ConsoleText');
const Formulas       = invoke('GameServer/Formulas');
const Database       = invoke('Database');

class Actor extends ActorModel {
    constructor(session, data) {
        // Parent inheritance
        super(data);

        // Local
        this.automation = new Automation();
        this.attack     = new Attack();
        this.skillset   = new Skillset();
        this.backpack   = new Backpack(data);
        this.session    = session;

        delete this.model.items;
        delete this.model.paperdoll;
    }

    enterWorld() {
        // Calculate accumulated
        this.setCollectiveAll();
        this.skillset.populate(this.fetchId());

        // Start vitals replenish
        this.automation.setRevHp(DataCache.revitalize.hp[this.fetchLevel()]);
        this.automation.setRevMp(DataCache.revitalize.mp[this.fetchLevel()]);
        this.automation.replenishVitals(this);

        // Show npcs based on radius
        this.updatePosition({
            locX: this.fetchLocX(),
            locY: this.fetchLocY(),
            locZ: this.fetchLocZ(),
            head: this.fetchHead(),
        });

        // Default
        ConsoleText.transmit(this.session, ConsoleText.caption.welcome);
    }

    destructor() {
        this.unselect();
        this.clearStoredActions();
        this.attack.destructor();
        this.automation.destructor(this);
    }

    queueRequest(event, data) {
        if (this.state.fetchHits() || this.state.fetchCasts()) {
            this.attack.queueEvent(event, data);
        }
    }

    moveTo(coords) {
        if (this.isDead()) {
            return;
        }

        if (this.isBlocked()) {
            this.queueRequest('move', coords);
            return;
        }

        // Abort scheduled movement, user redirected the actor
        this.automation.abortAll(this);
        this.session.dataSend(ServerResponse.moveToLocation(this.fetchId(), coords));
    }

    updatePosition(coords) {
        // TODO: Write less in DB about movement
        this.setLocXYZH(coords);
        Database.updateCharacterLocation(this.fetchId(), coords);

        // Render npcs found inside user's radius
        const inRadiusNpcs = World.npc.spawns.filter(ob => Formulas.calcWithinRadius(coords.locX, coords.locY, ob.fetchLocX(), ob.fetchLocY(), 3500)) ?? [];
        inRadiusNpcs.forEach((npc) => {
            this.session.dataSend(ServerResponse.npcInfo(npc));
        });

        // Reschedule actions based on updated position
        if (this.storedAttack) {
            this.attackExec(structuredClone(this.storedAttack));
            this.clearStoredActions();
        }

        if (this.storedSpell) {
            this.skillExec(structuredClone(this.storedSpell));
            this.clearStoredActions();
        }

        if (this.storedPickup) {
            this.pickupExec(structuredClone(this.storedPickup));
            this.clearStoredActions();
        }
    }

    clearStoredActions() {
        this.storedAttack = undefined;
        this.storedSpell  = undefined;
        this.storedPickup = undefined;
    }

    select(data) {
        if (this.fetchId() === data.id) { // Click on self
            this.setDestId(this.fetchId());
            this.session.dataSend(ServerResponse.destSelected(this.fetchDestId()));
            return;
        }

        World.fetchNpc(data.id).then((npc) => {
            if (npc.fetchId() !== this.fetchDestId()) { // First click on a Creature
                this.setDestId(npc.fetchId());
                this.session.dataSend(ServerResponse.destSelected(this.fetchDestId(), this.fetchLevel() - npc.fetchLevel()));
                this.statusUpdateVitals(npc);
            }
            else { // Second click on same Creature
                this.attackRequest(data);
            }
        }).catch(() => {
            this.pickupRequest(data);
        });
    }

    unselect() {
        this.clearDestId();
        this.session.dataSend(ServerResponse.destDeselected(this));
    }

    attackRequest(data) {
        if (this.isDead()) {
            return;
        }

        if (this.isBlocked()) {
            this.queueRequest('attack', data);
            return;
        }

        if (this.state.inMotion()) {
            if (this.state.fetchTowards() === 'remote' || this.fetchDestId() !== this.automation.fetchDestId()) {
                this.storedAttack = data;
                this.requestStopAutomation();
                return;
            }
        }

        if (this.state.fetchTowards() === 'melee') {
            return;
        }

        this.storedAttack = data;
        this.requestStopAutomation();
    }

    attackExec(data) {
        World.fetchNpc(data.id).then((npc) => {
            this.automation.scheduleAction(this.session, this, npc, 0, () => {
                if (npc.fetchAttackable() || data.ctrl) {
                    this.attack.meleeHit(this.session, npc);
                }
                else {
                    World.npcTalk(this.session, npc);
                }
            });
        }).catch((err) => {
            utils.infoWarn('GameServer :: Attack -> ' + err);
        });
    }

    skillRequest(data) {
        if (this.isDead()) {
            return;
        }

        if ((data.id = this.fetchDestId()) === undefined) {
            return;
        }

        if (this.isBlocked()) {
            this.queueRequest('spell', data);
            return;
        }

        if (this.state.inMotion()) {
            if (this.state.fetchTowards() === 'melee' || this.fetchDestId() !== this.automation.fetchDestId()) {
                this.storedSpell = data;
                this.requestStopAutomation();
                return;
            }
        }

        if (this.state.fetchTowards() === 'remote') {
            return;
        }

        this.storedSpell = data;
        this.requestStopAutomation();
    }

    skillExec(data) {
        World.fetchNpc(data.id).then((npc) => {
            const skill = this.skillset.fetchSkill(data.selfId);
            this.automation.scheduleAction(this.session, this, npc, skill.fetchDistance(), () => {
                if (npc.fetchAttackable() || data.ctrl) { // TODO: Else, find which `response` fails the attack
                    this.attack.remoteHit(this.session, npc, skill);
                }
            });
        }).catch((err) => {
            utils.infoWarn('GameServer :: Skill -> ' + err);
        });
    }

    pickupRequest(data) {
        if (this.isDead()) {
            return;
        }

        if (this.isBlocked()) {
            this.queueRequest('pickup', data);
            return;
        }

        if (this.state.fetchTowards() === 'pickup') {
            return;
        }

        this.storedPickup = data;
        this.requestStopAutomation();
    }

    pickupExec(data) {
        World.fetchItem(data.id).then((item) => {
            this.automation.schedulePickup(this.session, this, item, () => {
                this.state.setPickinUp(true);
                this.session.dataSend(ServerResponse.pickupItem(this.fetchId(), item));

                setTimeout(() => {
                    World.pickupItemFromGround(this.session, this, item);
                }, 250);

                setTimeout(() => {
                    this.state.setPickinUp(false);
                }, 500);
            });
        }).catch((err) => {
            utils.infoWarn('GameServer :: Pickup -> ' + err);
        });
    }

    requestStopAutomation() {
        this.automation.abortAll(this);

        this.session.dataSend(
            ServerResponse.stopMove(this.fetchId(), {
                locX: this.fetchLocX(),
                locY: this.fetchLocY(),
                locZ: this.fetchLocZ(),
                head: this.fetchHead(),
            })
        );
    }

    basicAction(data) {
        if (this.isDead()) {
            return;
        }

        switch (data.actionId) {
        case 0x00: // Sit / Stand
            if (this.state.fetchHits() || this.state.fetchCasts() || this.state.fetchAnimated() || this.state.inMotion()) {
                this.queueRequest('sit', data);
                return;
            }

            this.state.setAnimated(true);
            this.state.setSeated(!this.state.fetchSeated());
            this.session.dataSend(ServerResponse.sitAndStand(this));

            setTimeout(() => {
                this.state.setAnimated(false);
            }, 2500);
            break;

        case 0x01: // Walk / Run
            this.state.setWalkin(!this.state.fetchWalkin());
            this.session.dataSend(
                ServerResponse.walkAndRun(this.fetchId(), this.state.fetchWalkin() ? 0 : 1)
            );
            break;

        case 0x28: // Recommend without selection
            break;

        default:
            utils.infoWarn('GameServer :: unknown basic action 0x%s', utils.toHex(data.actionId));
            break;
        }
    }

    socialAction(actionId) {
        if (this.isDead() || this.isBlocked() || this.state.inMotion()) {
            return;
        }

        this.automation.abortAll(this);
        this.session.dataSend(ServerResponse.socialAction(this.fetchId(), actionId));
    }

    npcDied(npc) {
        World.removeNpc(this.session, npc);

        if (this.isDead() === false) {
            Methods.expAndSpReward(this.session, this, npc.fetchRewardExp(), npc.fetchRewardSp());
        }
    }

    enterCombatState() {
        if (this.state.fetchCombats()) {
            return;
        }

        this.state.setCombats(true);
        this.session.dataSend(ServerResponse.autoAttackStart(this.fetchId()));
    }

    abortCombatState() {
        this.clearDestId();
        this.state.setCombats(false);
        this.automation.destructor(this);

        this.session.dataSend(ServerResponse.autoAttackStop(this.fetchId()));
    }

    hitReceived(hit) {
        this.setHp(Math.max(0, this.fetchHp() - hit)); // HP bar would disappear if less than zero
        this.statusUpdateVitals(this);

        // On hit, actor should stand-up
        if (this.state.fetchSeated()) {
            this.basicAction({ actionId: 0 });
        }

        // Bummer
        if (this.fetchHp() <= 0) {
            this.die();
            return;
        }

        this.automation.replenishVitals(this);
        this.enterCombatState();
    }

    die() {
        if (this.isDead()) {
            return;
        }

        this.destructor();
        this.state.setDead(true);
        this.session.dataSend(ServerResponse.die(this.fetchId()));
    }

    revive() {
        this.session.dataSend(ServerResponse.revive(this.fetchId()));
        this.automation.replenishVitals(this);

        setTimeout(() => {
            this.state.setDead(false);
            this.socialAction(9); // SWAG stand-up
        }, 2500);
    }

    teleportTo(coords) {
        if (this.isDead() || this.isBlocked()) {
            return;
        }

        this.automation.abortAll(this);
        this.session.dataSend(ServerResponse.teleportToLocation(this.fetchId(), coords));

        // Turns out to be a viable solution
        setTimeout(() => {
            this.updatePosition(coords);
        }, 1000);
    }

    admin() {
        this.session.dataSend(
            ServerResponse.npcHtml(this.fetchId(), utils.parseRawFile('data/Html/Admin/main.html'))
        );
    }

    // State

    isBlocked() {
        if (this.state.isBlocked()) {
            this.session.dataSend(ServerResponse.actionFailed());
            return true;
        }
        return false;
    }

    isDead() {
        if (this.state.fetchDead()) {
            this.session.dataSend(ServerResponse.actionFailed());
            return true;
        }
        return false;
    }

    // Calculate stats

    setCollectiveTotalHp() {
        const base = Formulas.calcHp(this.fetchLevel(), this.fetchClassId(), this.fetchCon());
        this.setMaxHp(base);
        this.setHp(Math.min(this.fetchHp(), this.fetchMaxHp()));
    }

    setCollectiveTotalMp() { // TODO: Fix hardcoded class transfer parameter
        const base  = Formulas.calcMp(this.fetchLevel(), this.isSpellcaster(), 0, this.fetchMen());
        const bonus = this.backpack.fetchTotalArmorBonusMp();
        this.setMaxMp(base + bonus);
        this.setMp(Math.min(this.fetchMp(), this.fetchMaxMp()));
    }

    setCollectiveTotalLoad() {
        const base = Formulas.calcMaxLoad(this.fetchCon());
        this.setMaxLoad(base);
        this.setLoad(this.backpack.fetchTotalLoad());
    }

    setCollectiveTotalPAtk() {
        const pAtk = this.backpack.fetchTotalWeaponPAtk() ?? this.fetchPAtk();
        const base = Formulas.calcPAtk(this.fetchLevel(), this.fetchStr(), pAtk);
        this.setCollectivePAtk(base);
    }

    setCollectiveTotalMAtk() {
        const mAtk = this.backpack.fetchTotalWeaponMAtk() ?? this.fetchMAtk();
        const base = Formulas.calcMAtk(this.fetchLevel(), this.fetchInt(), mAtk);
        this.setCollectiveMAtk(base);
    }

    setCollectiveTotalPDef() {
        const pDef = this.backpack.fetchTotalArmorPDef(this.isSpellcaster()) ?? this.fetchPDef();
        const base = Formulas.calcPDef(this.fetchLevel(), pDef);
        this.setCollectivePDef(base);
    }

    setCollectiveTotalMDef() {
        const mDef = this.backpack.fetchTotalArmorMDef() ?? this.fetchMDef();
        const base = Formulas.calcMDef(this.fetchLevel(), this.fetchMen(), mDef);
        this.setCollectiveMDef(base);
    }

    setCollectiveTotalAccur() {
        const accur = this.backpack.fetchTotalWeaponAccur() ?? this.fetchAccur();
        const base  = Formulas.calcAccur(this.fetchLevel(), this.fetchDex(), accur);
        this.setCollectiveAccur(base);
    }

    setCollectiveTotalEvasion() {
        const evasion = this.backpack.fetchTotalArmorEvasion() ?? this.fetchEvasion();
        const base    = Formulas.calcEvasion(this.fetchLevel(), this.fetchDex(), evasion);
        this.setCollectiveEvasion(base);
    }

    setCollectiveTotalCritical() {
        const critical = this.backpack.fetchTotalWeaponCritical() ?? this.fetchCritical();
        const base    = Formulas.calcCritical(this.fetchDex(), critical);
        this.setCollectiveCritical(base);
    }

    setCollectiveTotalAtkSpd() {
        const atkSpd = this.backpack.fetchTotalWeaponAtkSpd() ?? this.fetchAtkSpd();
        const base   = Formulas.calcAtkSpd(this.fetchDex(), atkSpd);
        this.setCollectiveAtkSpd(base);
    }

    setCollectiveTotalCastSpd() {
        const base = Formulas.calcCastSpd(this.fetchWit());
        this.setCollectiveCastSpd(base);
    }

    setCollectiveTotalWalkSpd() {
        const base = Formulas.calcSpeed(this.fetchDex());
        this.setCollectiveWalkSpd(base);
    }

    setCollectiveTotalRunSpd() {
        const base = Formulas.calcSpeed(this.fetchDex());
        this.setCollectiveRunSpd(base);
    }

    setCollectiveAll() {
        this.setCollectiveTotalHp();
        this.setCollectiveTotalMp();
        this.setCollectiveTotalLoad();
        this.setCollectiveTotalPAtk();
        this.setCollectiveTotalMAtk();
        this.setCollectiveTotalPDef();
        this.setCollectiveTotalMDef();
        this.setCollectiveTotalAccur();
        this.setCollectiveTotalEvasion();
        this.setCollectiveTotalCritical();
        this.setCollectiveTotalAtkSpd();
        this.setCollectiveTotalCastSpd();
        this.setCollectiveTotalWalkSpd();
        this.setCollectiveTotalRunSpd();
    }

    // Update stats

    statusUpdateLevelExpSp(creature) {
        this.session.dataSend(
            ServerResponse.statusUpdate(creature.fetchId(), [
                { id: 0x1, value: creature.fetchLevel() },
                { id: 0x2, value: creature.fetchExp  () },
                { id: 0xd, value: creature.fetchSp   () },
            ])
        );
    }

    statusUpdateVitals(creature) {
        this.session.dataSend(
            ServerResponse.statusUpdate(creature.fetchId(), [
                { id: 0x9, value: creature.fetchHp   () },
                { id: 0xa, value: creature.fetchMaxHp() },
                { id: 0xb, value: creature.fetchMp   () },
                { id: 0xc, value: creature.fetchMaxMp() },
            ])
        );
    }

    statusUpdateStats(creature) {
        this.session.dataSend(
            ServerResponse.statusUpdate(creature.fetchId(), [
                { id: 0x11, value: creature.fetchCollectivePAtk  () },
                { id: 0x17, value: creature.fetchCollectiveMAtk  () },
                { id: 0x12, value: creature.fetchCollectiveAtkSpd() },
            ])
        );
    }
}

module.exports = Actor;
