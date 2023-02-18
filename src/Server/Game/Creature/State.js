class CreatureState {
    constructor() {
        this.isSeated    = false;
        this.isWalkin    = false;
        this.inProcedure = false;
    }

    // Set

    setSeated(seated) {
        this.isSeated = seated;
    }

    setWalkin(walkin) {
        this.isWalkin = walkin;
    }

    setProcedure(procedure) {
        this.inProcedure = procedure;
    }

    // Get

    fetchSeated() {
        return this.isSeated;
    }

    fetchWalkin() {
        return this.isWalkin;
    }

    fetchProcedure() {
        return this.inProcedure;
    }
}

module.exports = CreatureState;
