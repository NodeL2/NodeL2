class CreatureState {
    constructor() {
        this.isAsleep   = false;
        this.isCastin   = false;
        this.inCombat   = false;
        this.isPickinUp = false;
        this.isRooted   = false;
        this.isSeated   = false;
        this.isWalkin   = false;
        this.isMovin    = false;
    }

    // Set

    setSeated(seated) {
        this.isSeated = seated;
    }

    setWalkin(walkin) {
        this.isWalkin = walkin;
    }

    // Get

    fetchSeated() {
        return this.isSeated;
    }

    fetchWalkin() {
        return this.isWalkin;
    }
}

module.exports = CreatureState;
