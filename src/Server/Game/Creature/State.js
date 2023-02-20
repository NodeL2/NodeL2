class CreatureState {
    constructor() {
        this.isSeated   = false;
        this.isWalkin   = false;
        this.isOccupied = false;
    }

    // Set

    setSeated(seated) {
        this.isSeated = seated;
    }

    setWalkin(walkin) {
        this.isWalkin = walkin;
    }

    setOccupied(occupied) {
        this.isOccupied = occupied;
    }

    // Get

    fetchSeated() {
        return this.isSeated;
    }

    fetchWalkin() {
        return this.isWalkin;
    }

    fetchOccupied() {
        return this.isOccupied;
    }
}

module.exports = CreatureState;
