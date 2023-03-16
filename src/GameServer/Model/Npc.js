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

    fetchRevHp() {
        return this.model.revHp;
    }

    fetchRevMp() {
        return this.model.revMp;
    }

    fetchRewardExp() {
        return this.model.exp;
    }

    fetchRewardSp() {
        return this.model.sp;
    }

    // Abstract

    fetchAttackable() {
        return this.model.kind.includes('Monster.');
    }
}

module.exports = NpcModel;
