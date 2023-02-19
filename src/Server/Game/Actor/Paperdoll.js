class Paperdoll {
    constructor(paperdoll) {
        this.raw = paperdoll;
    }

    // Get

    fetchId(slot) {
        return this.raw[slot].id;
    }

    fetchItemId(slot) {
        return this.raw[slot].itemId;
    }

    equip(slot, id, itemId) {
        this.raw[slot] = { id: id, itemId: itemId };
    }

    unequip(slot) {
        this.raw[slot] = {};
    }
}

module.exports = Paperdoll;
