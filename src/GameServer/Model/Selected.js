class Selected {
    constructor() {
        this.clearDestId();
    }

    // Set

    setDestId(id) {
        this.destId = id;
    }

    // Get

    fetchDestId() {
        return this.destId;
    }

    // Abstract

    clearDestId() {
        this.destId = undefined;
    }
}

module.exports = Selected;
