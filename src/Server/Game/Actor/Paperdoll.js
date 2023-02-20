class Paperdoll {
    constructor(paperdoll) {
        this.raw = paperdoll;
    }

    // Get

    fetchId(slot) {
        return this.raw[slot].id;
    }

    fetchSelfId(slot) {
        return this.raw[slot].selfId;
    }

    equip(slot, id, selfId) {
        this.raw[slot] = { id: id, selfId: selfId };
    }

    unequip(slot) {
        this.raw[slot] = {};
    }
}

module.exports = Paperdoll;
