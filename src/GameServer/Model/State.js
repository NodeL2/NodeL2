class StateModel {
    constructor() {
        this.isAnimated  = false; // Blocked: tries to sit down / stand-up (unblocks after animation)
        this.isSeated    = false; // Blocked: seated down                  (unblocks after stand-up action)
        this.inCombat    = false; // Blocked: combats                      (unblocks after attack)
        this.isCastin    = false; // Blocked: casts skill                  (unblocks after skill cast, or esc)
        this.isScheduled = false; // Non-blocked: towards attack
        this.isPickinUp  = false; // Non-blocked: towards pick-up
        this.isWalkin    = false; // No effect
    }

    // Set

    setAnimated(data) {
        this.isAnimated = data;
    }

    setSeated(data) {
        this.isSeated = data;
    }

    setCombats(data) {
        this.inCombat = data;
    }

    setCasts(data) {
        this.isCastin = data;
    }

    setScheduled(data) {
        this.isScheduled = data;
    }

    setPickinUp(data) {
        this.isPickinUp = data;
    }

    setWalkin(data) {
        this.isWalkin = data;
    }

    // Get

    fetchAnimated() {
        return this.isAnimated;
    }

    fetchSeated() {
        return this.isSeated;
    }

    fetchCombats() {
        return this.inCombat;
    }

    fetchCasts() {
        return this.isCastin;
    }

    fetchScheduled() {
        return this.isScheduled;
    }

    fetchPickinUp() {
        return this.isPickinUp;
    }

    fetchWalkin() {
        return this.isWalkin;
    }

    // Abstract

    isBusy() {
        return this.fetchCasts() || this.fetchCombats() || this.fetchAnimated() || this.fetchSeated();
    }
}

module.exports = StateModel;
