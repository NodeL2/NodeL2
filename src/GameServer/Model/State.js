class StateModel {
    constructor() {
        this.isSeated    = false;
        this.isWalkin    = false;
        this.isOnTheMove = false;
        this.isOccupied  = false;
        this.inCombat    = false;
        this.isCastin    = false;
    }

    // Set

    setSeated(data) {
        this.isSeated = data;
    }

    setWalkin(data) {
        this.isWalkin = data;
    }

    setOnTheMove(data) {
        this.isOnTheMove = data;
    }

    setOccupied(data) {
        this.isOccupied = data;
    }

    setCombats(data) {
        this.inCombat = data;
    }

    setCasts(data) {
        this.isCastin = data;
    }

    // Get

    fetchSeated() {
        return this.isSeated;
    }

    fetchWalkin() {
        return this.isWalkin;
    }

    fetchOnTheMove() {
        return this.isOnTheMove;
    }

    fetchOccupied() {
        return this.isOccupied;
    }

    fetchCombats() {
        return this.inCombat;
    }

    fetchCasts() {
        return this.isCastin;
    }

    isBusy() {
        return this.fetchCasts() || this.fetchCombats() || this.fetchOccupied() || this.fetchSeated();
    }
}

module.exports = StateModel;
