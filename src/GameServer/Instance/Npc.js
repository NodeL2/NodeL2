const NpcModel = invoke('GameServer/Model/Npc');

class Npc extends NpcModel {
    constructor(id, data) {
        // Parent inheritance
        super(data);

        // Local
        this.setId(id);
        this.fillupVitals();

        this.timer = { // TODO: Move this into actual GameServer timer
            replenish : undefined
        };

        this.replenishVitals();

        // User preferences
        const optn = options.connection.GameServer;

        if (optn.levelTitle) {
            this.showLevelTitle();
        }
    }

    destructor() {
        clearInterval(this.timer.replenish);
    }

    showLevelTitle() {
        if (this.fetchKind() === 'Monster' && this.fetchTitle() === '') {
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
}

module.exports = Npc;
