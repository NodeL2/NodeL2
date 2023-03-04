const NpcModel = invoke('GameServer/Model/Npc');

class Npc extends NpcModel {
    constructor(id, data) {
        // Parent inheritance
        super(data);

        // Local
        this.setId(id);
        this.setHp(utils.randomNumber(this.fetchMaxHp()));
        this.setMp(utils.randomNumber(this.fetchMaxMp()));

        this.timer = { // TODO: Move this into actual GameServer timer
            replenish : undefined
        };

        this.replenishHp();

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

    replenishHp() {
        clearInterval(this.timer.replenish);
        this.timer.replenish = setInterval(() => {
            const value = this.fetchHp() + 3; // TODO: Not real formula
            const max   = this.fetchMaxHp();

            this.setHp(Math.min(value, max));
        }, 3000);
    }
}

module.exports = Npc;
