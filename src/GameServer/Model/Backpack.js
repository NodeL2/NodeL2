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

    fetchItem(id, success) {
        const item = this.fetchItems().find((ob) => ob.fetchId() === id);
        item ? success(item) : null;
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
        const equip = this.equipment;

        return (
            (this.fetchEquippedArmor(equip.head )?.fetchBonusMp() ?? 0) +
            (this.fetchEquippedArmor(equip.chest)?.fetchBonusMp() ?? 0) +
            (this.fetchEquippedArmor(equip.pants)?.fetchBonusMp() ?? 0) +
            (this.fetchEquippedArmor(equip.hands)?.fetchBonusMp() ?? 0) +
            (this.fetchEquippedArmor(equip.feet )?.fetchBonusMp() ?? 0)
        );
    }

    fetchTotalLoad() {
        let values = this.fetchItems().map((ob) => ob.fetchMass()) ?? [];
        return values.reduce((acc, value) => acc + value);
    }
}

module.exports = BackpackModel;
