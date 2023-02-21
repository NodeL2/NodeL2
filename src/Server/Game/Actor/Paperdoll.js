class Paperdoll {
    constructor(data) {
        this.parts = data;
    }

    // Get

    fetchId(slot) {
        return this.parts[slot].id;
    }

    fetchSelfId(slot) {
        return this.parts[slot].selfId;
    }

    equip(slot, id, selfId) {
        this.parts[slot] = { id: id, selfId: selfId };
    }

    unequip(slot) {
        this.parts[slot] = {};
    }
}

module.exports = Paperdoll;
