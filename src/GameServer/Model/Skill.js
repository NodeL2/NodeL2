class SkillModel {
    constructor(data) {
        this.model = data;
    }

    // Set

    setCalculatedHitTime(data) {
        this.model.calculatedHitTime = data;
    }

    // Get

    fetchSelfId() {
        return this.model.selfId;
    }

    fetchLevel() {
        return this.model.level;
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

    fetchCalculatedHitTime() {
        return this.model.calculatedHitTime ?? this.fetchHitTime();
    }

    fetchReuseTime() {
        return this.model.reuse;
    }

    fetchPower() {
        return this.model.power;
    }
}

module.exports = SkillModel;
