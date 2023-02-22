const Creature = invoke('Server/Game/Creature/Creature');

class Npc extends Creature {
    constructor(id, data) {
        // Parent inheritance
        super(data);

        // Specific
        this.setId(id);
        this.setHp(utils.randomNumber(this.fetchMaxHp()));
        this.setMp(utils.randomNumber(this.fetchMaxMp()));
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
