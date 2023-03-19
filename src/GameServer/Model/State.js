class StateModel {
    constructor() {
        this.isAnimated = false; // Blocked: tries to sit down / stand-up (unblocks after animation)
        this.isSeated   = false; // Blocked: seated down                  (unblocks after stand-up action)
        this.inCombat   = false; // Blocked: combats                      (unblocks after attack)
        this.isCastin   = false; // Blocked: casts skill                  (unblocks after skill cast, or abort)
        this.isTowards  = false; // Non-blocked: towards action
        this.isPickinUp = false; // Non-blocked: towards pick-up
        this.isWalkin   = false; // No effect
        this.isDead     = false;
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

    setTowards(data) {
        this.isTowards = data;
    }

    setPickinUp(data) {
        this.isPickinUp = data;
    }

    setWalkin(data) {
        this.isWalkin = data;
    }

    setDead(data) {
        this.isDead = data;
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

    fetchTowards() {
        return this.isTowards;
    }

    fetchPickinUp() {
        return this.isPickinUp;
    }

    fetchWalkin() {
        return this.isWalkin;
    }

    fetchDead() {
        return this.isDead;
    }

    // Abstract

    inMotion() {
        return this.fetchTowards() || this.fetchPickinUp();
    }

    isBlocked() {
        return this.fetchCombats() || this.fetchCasts() || this.fetchAnimated() || this.fetchSeated();
    }
}

module.exports = StateModel;
