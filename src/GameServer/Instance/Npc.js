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
        if (this.fetchTitle() === '') {
            this.setTitle('Lv ' + this.fetchLevel() + (this.fetchHostile() ? ' @' : ''));
        }
    }

    replenishVitals() {
        const maxHp = this.fetchMaxHp();
        const maxMp = this.fetchMaxMp();

        clearInterval(this.timer.replenish);
        this.timer.replenish = setInterval(() => {
            const hp = this.fetchHp() + (maxHp / 100); // TODO: Not real formula
            const mp = this.fetchMp() + (maxMp / 100); // TODO: Not real formula

            const minHp = Math.min(hp, maxHp);
            const minMp = Math.min(mp, maxMp);

            this.setHp(minHp);
            this.setMp(minMp);

            if (minHp >= maxHp && minMp >= maxMp) {
                clearInterval(this.timer.replenish);
            }
        }, 3000);
    }
}

module.exports = Npc;
