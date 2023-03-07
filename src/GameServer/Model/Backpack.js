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

    fetchTotalBonusMp() {
        return (
            (this.fetchEquippedArmor(this.equipment.head )?.maxMp ?? 0) +
            (this.fetchEquippedArmor(this.equipment.chest)?.maxMp ?? 0) +
            (this.fetchEquippedArmor(this.equipment.pants)?.maxMp ?? 0) +
            (this.fetchEquippedArmor(this.equipment.hands)?.maxMp ?? 0) +
            (this.fetchEquippedArmor(this.equipment.feet )?.maxMp ?? 0)
        );
    }
}

module.exports = BackpackModel;
