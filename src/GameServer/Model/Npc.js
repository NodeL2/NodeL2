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

    // TODO: Exp & Sp do not exist, please add

    fetchRewardExp() {
        return 30;
    }

    fetchRewardSp() {
        return 5;
    }
}

module.exports = NpcModel;
