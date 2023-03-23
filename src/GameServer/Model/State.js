class StateModel {
    constructor() {
        this.destructor();
    }

    destructor() {
        this.isDead     = false; // Uber-blocked
        this.isAnimated = false; // Blocked: tries to sit down / stand-up (unblocks after animation)
        this.isSeated   = false; // Blocked: seated down                  (unblocks after stand-up action)
        this.inHit      = false; // Blocked: hit                          (unblocks after attack)
        this.isCast     = false; // Blocked: casts skill                  (unblocks after skill cast, or abort)
        this.isTowards  = false; // Non-blocked: towards action
        this.isPickinUp = false; // Non-blocked: towards pick-up
        this.inCombat   = false; // Non-blocked: combat
        this.isWalkin   = false; // No effect
    }

    // Set

    setDead(data) {
        this.isDead = data;
    }

    setAnimated(data) {
        this.isAnimated = data;
    }

    setSeated(data) {
        this.isSeated = data;
    }

    setHits(data) {
        this.inHit = data;
    }

    setCasts(data) {
        this.inCast = data;
    }

    setTowards(data) {
        this.isTowards = data;
    }

    setPickinUp(data) {
        this.isPickinUp = data;
    }

    setCombats(data) {
        this.inCombat = data;
    }

    setWalkin(data) {
        this.isWalkin = data;
    }

    // Get

    fetchDead() {
        return this.isDead;
    }

    fetchAnimated() {
        return this.isAnimated;
    }

    fetchSeated() {
        return this.isSeated;
    }

    fetchHits() {
        return this.inHit;
    }

    fetchCasts() {
        return this.inCast;
    }

    fetchTowards() {
        return this.isTowards;
    }

    fetchPickinUp() {
        return this.isPickinUp;
    }

    fetchCombats() {
        return this.inCombat;
    }

    fetchWalkin() {
        return this.isWalkin;
    }

    // Abstract

    inMotion() {
        return this.fetchTowards();
    }

    isBlocked() {
        return this.fetchHits() || this.fetchCasts() || this.fetchAnimated() || this.fetchSeated() || this.fetchPickinUp();
    }
}

module.exports = StateModel;
