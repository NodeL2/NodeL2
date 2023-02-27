const CreatureModel = invoke('GameServer/Model/Creature');

class NpcModel extends CreatureModel {

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

    fetchRespawn() {
        return this.model.respawn;
    }
}

module.exports = NpcModel;
