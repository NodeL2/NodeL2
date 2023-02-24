const Creature = invoke('Server/Game/Creature/Creature');

class Npc extends Creature {
    constructor(id, data) {
        // Parent inheritance
        super(data);

        // Specific
        this.setId(id);
        this.setHp(20 + utils.randomNumber(this.fetchMaxHp() - 20));
        this.setMp(20 + utils.randomNumber(this.fetchMaxMp() - 20));
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
