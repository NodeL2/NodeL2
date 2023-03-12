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
        const equip = this.equipment;

        if (slot === equip.armor) { // FB Armor, stupid implementation
            this.paperdoll[equip.chest] = { id: id, selfId: selfId };
            this.paperdoll[equip.pants] = { id: id, selfId: selfId };
        }

        this.paperdoll[slot] = { id: id, selfId: selfId };
    }

    unequipPaperdoll(slot) {
        const equip = this.equipment;

        if (slot === equip.armor) { // FB Armor, stupid implementation
            this.paperdoll[equip.chest] = {};
            this.paperdoll[equip.pants] = {};
        }

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

    fetchTotalPDef() {
        const equip = this.equipment;

        return (
            (this.fetchEquippedArmor(equip.head )?.fetchPDef() ?? 0) +
            (this.fetchEquippedArmor(equip.chest)?.fetchPDef() ?? 0) +
            (this.fetchEquippedArmor(equip.pants)?.fetchPDef() ?? 0) +
            (this.fetchEquippedArmor(equip.hands)?.fetchPDef() ?? 0) +
            (this.fetchEquippedArmor(equip.feet )?.fetchPDef() ?? 0)
        );
    }

    fetchTotalMDef() {
        const equip = this.equipment;

        return (
            (this.fetchEquippedArmor(equip.head )?.fetchMDef() ?? 0) +
            (this.fetchEquippedArmor(equip.chest)?.fetchMDef() ?? 0) +
            (this.fetchEquippedArmor(equip.pants)?.fetchMDef() ?? 0) +
            (this.fetchEquippedArmor(equip.hands)?.fetchMDef() ?? 0) +
            (this.fetchEquippedArmor(equip.feet )?.fetchMDef() ?? 0)
        );
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

    stackableExists(selfId) {
        return new Promise((success, fail) => {
            let item = this.fetchItems().find((ob) => ob.fetchSelfId() === selfId && ob.fetchStackable());
            return item ? success(item) : fail();
        });
    }
}

module.exports = BackpackModel;
