const Creature = invoke('Server/Game/Creature/Creature');

class Npc extends Creature {
    constructor(id, data) {
        // Parent inheritance
        super(data);

        // Specific
        this.setId(id);
        this.setHp(utils.randomNumber(this.fetchMaxHp()));
        this.setMp(utils.randomNumber(this.fetchMaxMp()));

        this.replenishHp = setInterval(() => {
            const value = this.fetchHp() + 3;
            const max   = this.fetchMaxHp();

            this.setHp(Math.min(value, max));
        }, 3500);
    }

    destructor() {
        clearInterval(this.replenishHp);
    }

    // Get

    fetchSelfId() {
        return this.model.selfId;
    }

    fetchKind() {
        return this.model.kind;
    }

    fetchAttackable() {
        return this.model.attackable;
    }

    fetchHostile() {
        return this.model.hostile;
    }
}

module.exports = Npc;
