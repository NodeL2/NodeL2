const ServerResponse = invoke('GameServer/Network/Response');
const NpcModel       = invoke('GameServer/Model/Npc');
const Automation     = invoke('GameServer/Instance/Automation');
const ConsoleText    = invoke('GameServer/ConsoleText');
const Formulas       = invoke('GameServer/Formulas');

class Npc extends NpcModel {
    constructor(id, data) {
        // Parent inheritance
        super(data);

        // Local
        this.automation = new Automation();

        this.setId(id);
        this.fillupVitals();

        this.timer = { // TODO: Move this into actual GameServer timer
            replenish : undefined
        };

        // User preferences
        const optn = options.default.General;

        if (optn.showMonsterLevel) {
            this.showLevelTitle();
        }
    }

    destructor() {
        this.clearDestId();
        this.stopReplenish();
        this.abortCombatState();
        this.automation.destructor(this);
    }

    showLevelTitle() {
        if (this.fetchAttackable() && this.fetchTitle() === '') {
            this.setTitle('Lv ' + this.fetchLevel() + (this.fetchHostile() ? ' @' : ''));
        }
    }

    replenishVitals() {
        if (this.timer.replenish) {
            return;
        }

        this.stopReplenish();
        this.timer.replenish = setInterval(() => {
            const maxHp = this.fetchMaxHp();
            const maxMp = this.fetchMaxMp();

            const minHp = Math.min(this.fetchHp() + this.fetchRevHp(), maxHp);
            const minMp = Math.min(this.fetchMp() + this.fetchRevMp(), maxMp);

            this.setHp(minHp);
            this.setMp(minMp);

            if (minHp >= maxHp && minMp >= maxMp) {
                this.stopReplenish();
            }
        }, 3000);
    }

    stopReplenish() {
        clearInterval(this.timer.replenish);
        this.timer.replenish = undefined;
    }

    enterCombatState(session, actor) {
        if (this.combatMode) {
            return;
        }

        this.setStateRun(true);
        this.setStateAttack(true);
        session.dataSend(ServerResponse.walkAndRun(this.fetchId(), this.fetchStateRun()));
        session.dataSend(ServerResponse.autoAttackStart(this.fetchId()));

        this.combatMode = setInterval(() => {
            if (actor.state.fetchDead()) {
                return;
            }

            if (this.state.isBlocked()) {
                return;
            }

            const delta = Formulas.calcDistance(this.fetchLocX(), this.fetchLocY(), actor.fetchLocX(), actor.fetchLocY());

            if (delta <= this.fetchRadius() + this.fetchAtkRadius()) {
                const speed = Formulas.calcMeleeAtkTime(this.fetchCollectiveAtkSpd());
                session.dataSend(ServerResponse.attack(this, actor.fetchId()));
                this.state.setCombats(true);

                setTimeout(() => {
                    const pAtk = this.fetchCollectivePAtk();
                    this.hit(session, actor, Formulas.calcMeleeHit(pAtk, 0, actor.fetchCollectivePDef()));

                }, speed * 0.644);

                setTimeout(() => {
                    this.state.setCombats(false);
                }, speed);
            }
        }, 500);
    }

    abortCombatState() {
        clearInterval(this.combatMode);
        this.combatMode = undefined;
    }

    hit(session, actor, hit) {
        actor.setHp(Math.max(0, actor.fetchHp() - hit)); // HP bar would disappear if less than zero
        actor.automation.replenishVitals(session, actor);

        actor.statusUpdateVitals(session, actor);
        ConsoleText.transmit(session, ConsoleText.caption.monsterHit, [{ kind: ConsoleText.kind.npc, value: this.fetchSelfId() + 1000000 }, { kind: ConsoleText.kind.number, value: hit }]);

        if (actor.fetchHp() <= 0) {
            this.clearDestId();
            this.abortCombatState();
            this.automation.destructor(this);

            actor.die(session);
            return;
        }
    }

    die(session) {
        this.destructor(session);
        this.state.setDead(true);
        session.dataSend(ServerResponse.die(this.fetchId()));
    }
}

module.exports = Npc;
