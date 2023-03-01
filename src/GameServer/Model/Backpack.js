class BackpackModel {
    constructor(data) {
        this.items = [];
        this.paperdoll = data;
    }

    // Set

    equipPaperdoll(slot, id, selfId) {
        this.paperdoll[slot] = { id: id, selfId: selfId };
    }

    unequipPaperdoll(slot) {
        this.paperdoll[slot] = {};
    }

    // Get

    fetchItems() {
        return this.items;
    }

    fetchPaperdollId(slot) {
        return this.paperdoll[slot].id;
    }

    fetchPaperdollSelfId(slot) {
        return this.paperdoll[slot].selfId;
    }

    // Abstract

    fetchEquippedArmor(slot) {
        return this.fetchItems().find(ob => ob.kind ===  'Armor' && ob.equipped && ob.slot === slot);
    }

    fetchEquippedWeapon() {
        return this.fetchItems().find(ob => ob.kind === 'Weapon' && ob.equipped);
    }
}

module.exports = BackpackModel;
