class SkillModel {
    constructor(data) {
        this.model = data;
    }

    // Set

    setCtrl(data) {
        this.model.ctrl = data;
    }

    // Get

    fetchSelfId() {
        return this.model.selfId;
    }

    fetchLevel() {
        return 1;
    }

    fetchPassive() {
        return this.model.passive;
    }

    fetchDistance() {
        return this.model.distance;
    }

    fetchConsumedHp() {
        return this.model.hp;
    }

    fetchConsumedMp() {
        return this.model.mp;
    }

    fetchHitTime() {
        return this.model.hitTime;
    }

    fetchReuseTime() {
        return this.model.reuse;
    }

    fetchPower() {
        return this.model.power;
    }

    fetchCtrl() {
        return this.model.ctrl;
    }
}

module.exports = SkillModel;
