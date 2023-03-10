class BackpackModel {
    constructor(data) {
        this.items = [];
        this.paperdoll = data;
    }

    // Enum

    equipment = {
        head   :  6,
        weapon :  7,
        shield :  8,
        hands  :  9,
        chest  : 10,
        pants  : 11,
        feet   : 12,
        duals  : 14,
        armor  : 15,
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
        return this.fetchItems().find(ob => ob.fetchKind() ===  'Armor' && ob.fetchEquipped() && ob.fetchSlot() === slot);
    }

    fetchEquippedWeapon() {
        return this.fetchItems().find(ob => ob.fetchKind() === 'Weapon' && ob.fetchEquipped());
    }

    fetchTotalBonusMp() {
        return (
            (this.fetchEquippedArmor(this.equipment.head )?.fetchBonusMp() ?? 0) +
            (this.fetchEquippedArmor(this.equipment.chest)?.fetchBonusMp() ?? 0) +
            (this.fetchEquippedArmor(this.equipment.pants)?.fetchBonusMp() ?? 0) +
            (this.fetchEquippedArmor(this.equipment.hands)?.fetchBonusMp() ?? 0) +
            (this.fetchEquippedArmor(this.equipment.feet )?.fetchBonusMp() ?? 0)
        );
    }

    fetchTotalLoad() {
        let values = this.items.map((ob) => ob.fetchMass()) ?? [];
        return values.reduce((accumulator, value) => accumulator + value);
    }
}

module.exports = BackpackModel;
