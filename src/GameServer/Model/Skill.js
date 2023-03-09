class SkillModel {
    constructor(data) {
        this.model = data;

        console.info(this.model);
    }

    // Get

    fetchSelfId() {
        return this.model.selfId;
    }

    fetchPassive() {
        return this.model.passive;
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
        return this.model.reuseTime;
    }

    fetchPower() {
        return this.model.power;
    }
}

module.exports = SkillModel;
