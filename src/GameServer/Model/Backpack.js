class BackpackModel {
    constructor(data) {
        this.items = [];
        this.paperdoll = data;
    }

    // Set

    equip(slot, id, selfId) {
        this.paperdoll[slot] = { id: id, selfId: selfId };
    }

    unequip(slot) {
        this.paperdoll[slot] = {};
    }

    // Get

    fetchItems() {
        return this.items;
    }

    fetchId(slot) {
        return this.paperdoll[slot].id;
    }

    fetchSelfId(slot) {
        return this.paperdoll[slot].selfId;
    }
}

module.exports = BackpackModel;
