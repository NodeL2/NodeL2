const ServerResponse = invoke('GameServer/Network/Response');
const NpcModel       = invoke('GameServer/Model/Npc');
const Automation     = invoke('GameServer/Instance/Automation');

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

        this.replenishVitals();

        // User preferences
        const optn = options.default.GameServer;

        if (optn.showMonsterLevel) {
            this.showLevelTitle();
        }
    }

    destructor() {
        clearInterval(this.timer.replenish);
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
        this.automation.scheduleAction(session, this, actor, this.fetchAtkRadius(), () => {
            this.setLocX(actor.fetchLocX());
            this.setLocY(actor.fetchLocY());
            session.dataSend(ServerResponse.attack(this, actor.fetchId()));
        });
    }

    fetchStateRun() {
        return 1;
    }

    fetchStateAttack() {
        return 1;
    }
}

module.exports = Npc;
