const CreatureModel = invoke('GameServer/Model/Creature');

class NpcModel extends CreatureModel {

    // Get

    fetchSelfId() {
        return this.model.selfId;
    }

    fetchKind() {
        return this.model.kind;
    }

    fetchHostile() {
        return this.model.hostile;
    }

    // TODO: Exp & Sp do not exist, please add

    fetchRewardExp() {
        return 100000;
    }

    fetchRewardSp() {
        return 5;
    }

    // Abstract

    fetchAttackable() {
        return this.model.kind === 'Monster';
    }
}

module.exports = NpcModel;
