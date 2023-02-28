const ServerResponse = invoke('GameServer/Network/Response');
const ActorModel     = invoke('GameServer/Model/Actor');
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
        this.backpack = new Backpack(data);
        this.destId   = undefined;
        this.timer    = undefined; // TODO: Move this into actual GameServer timer
        this.timerMp  = undefined;

        this.setCollectiveTotalHp();
        this.setCollectiveTotalMp();

        // Local
        delete this.model.items;
        delete this.model.paperdoll;
    }

    destructor() {
        clearInterval(this.timerMp);
    }

    setCollectiveTotalHp() {
        this.setMaxHp(Formulas.calcHp(this.fetchLevel(), this.fetchClassId(), this.fetchCon()));
    }

    setCollectiveTotalMp() {
        this.setMaxMp(59); // TODO: Heh...
    }

    moveTo(session, coords) {
        if (this.isBusy(session)) {
            return;
        }

        this.abortScheduleTimer();
        session.dataSend(ServerResponse.moveToLocation(this.fetchId(), coords));
    }

    updatePosition(session, coords) {
        this.setLocXYZH(coords);
        (World.npc.spawns.filter(ob => Formulas.calcWithinRadius(coords.locX, coords.locY, ob.fetchLocX(), ob.fetchLocY(), 2500)) ?? []).forEach((npc) => {
            session.dataSend(ServerResponse.npcInfo(npc));
        });

         // TODO: Write less in DB about movement
        Database.updateCharacterLocation(this.fetchId(), coords);
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

                this.scheduleArrival(session, this, npc, 20, () => {
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
            this.scheduleArrival(session, this, npc, data.distance, () => {
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

        this.abortScheduleTimer();
        session.dataSend(ServerResponse.socialAction(this.fetchId(), actionId));
    }

    unstuck(session) {
        if (this.isBusy(session)) {
            return;
        }

        const coords = {
            locX: 80304, locY: 56241, locZ: -1500, head: this.fetchHead()
        };

        this.abortScheduleTimer();
        session.dataSend(ServerResponse.teleportToLocation(this.fetchId(), coords));

        // TODO: Hide this from the world, soon. Utter stupid.
        setTimeout(() => {
            this.updatePosition(session, coords);
        });
    }

    admin(session) {
        session.dataSend(
            ServerResponse.npcHtml(this.fetchId(), utils.parseRawFile('data/Html/Default/admin.html'))
        );
    }

    fetchEquippedWeapon() {
        return this.backpack.fetchItems().find(ob => ob.kind === 'Weapon' && ob.equipped);
    }

    isBusy(session) {
        if (this.state.isBusy()) {
            session.dataSend(ServerResponse.actionFailed());
            return true;
        }
        return false;
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

    statusUpdateLevelExpSp(session, creature) {
        session.dataSend(
            ServerResponse.statusUpdate(creature.fetchId(), [
                { id: 0x1, value: creature.fetchLevel() },
                { id: 0x2, value: creature.fetchExp  () },
                { id: 0xd, value: creature.fetchSp   () },
            ])
        );
    }

    scheduleArrival(session, creatureSrc, creatureDest, offset, callback) {
        const ticksPerSecond = 10;
        const distance = Formulas.calcDistance(
            creatureSrc .fetchLocX(), creatureSrc .fetchLocY(),
            creatureDest.fetchLocX(), creatureDest.fetchLocY(),
        ) - offset;

        // Execute each time, or else actor is stuck
        session.dataSend(
            ServerResponse.moveToPawn(creatureSrc, creatureDest, offset)
        );

        // Melee radius, no need to move
        if (distance <= creatureDest.fetchRadius() + 30) {
            this.abortScheduleTimer();
            callback();
            return;
        }

        if (this.state.fetchOnTheMove()) {
            return;
        }

        // Calculate duration and reset
        const ticksToMove = 1 + ((ticksPerSecond * distance) / creatureSrc.fetchRun());
        this.abortScheduleTimer();

        // Actor is occupied
        this.state.setOnTheMove(true);

        // Arrived
        this.timer = setTimeout(() => {
            this.state.setOnTheMove(false);
            callback();

        }, (1000 / ticksPerSecond) * ticksToMove);
    }

    abortScheduleTimer() {
        this.state.setOnTheMove(false);

        clearTimeout(this.timer);
        this.timer = undefined;
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

        this.abortScheduleTimer();
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
        const wpnPAtk = actor.fetchEquippedWeapon()?.pAtk ?? actor.fetchPAtk();
        const pAtk = Formulas.calcPAtk(actor.fetchLevel(), actor.fetchStr(), wpnPAtk);
        return Formulas.calcMeleeHit(pAtk, npc.fetchPDef());
    }

    hitMAtk(actor, npc) {
        const wpnMAtk = actor.fetchEquippedWeapon()?.mAtk ?? actor.fetchMAtk();
        const mAtk = Formulas.calcMAtk(actor.fetchLevel(), actor.fetchInt(), wpnMAtk);
        return Formulas.calcRemoteHit(mAtk, 12, npc.fetchMDef());
    }

    replenishMp(session) {
        clearInterval(this.timerMp);
        this.timerMp = setInterval(() => {
            const value = this.fetchMp() + 3;
            const max   = this.fetchMaxMp();

            this.setMp(Math.min(value, max));
            this.statusUpdateVitals(session, this);
        }, 3500); // TODO: Not real formula
    }

    rewardExpAndSp(session, exp, sp) {
        let level    = 0;
        let totalExp = this.fetchExp() + exp;
        let totalSp  = this.fetchSp () +  sp;

        for (let i = 0; i < 75; i++) {
            if (totalExp >= DataCache.experience[i] && totalExp < DataCache.experience[i + 1]) {
                level = i + 1; // Leveled up
            }
        }

        if (level > this.fetchLevel()) {
            this.setLevel(level);
            this.setCollectiveTotalHp();
            this.fillupVitals();
            this.statusUpdateVitals(session, this);
            Database.updateCharacterVitals(this.fetchId(), this.fetchHp(), this.fetchMaxHp(), this.fetchMp(), this.fetchMaxMp());
            session.dataSend(ServerResponse.socialAction(this.fetchId(), 15));
        }

        this.setExpSp(totalExp, totalSp);
        this.statusUpdateLevelExpSp(session, this);
        Database.updateCharacterExperience(this.fetchId(), this.fetchLevel(), totalExp, totalSp);
    }
}

module.exports = Actor;
