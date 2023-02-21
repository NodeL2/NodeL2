class CreatureState {
    constructor() {
        this.isSeated    = false;
        this.isWalkin    = false;
        this.isOnTheMove = false;
        this.isOccupied  = false;
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
}

module.exports = CreatureState;
