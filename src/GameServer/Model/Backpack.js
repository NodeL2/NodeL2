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

    fetchItemRaw(id) {
        return this.fetchItems().find((ob) => ob.fetchId() === id);
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

    fetchTotalArmorPDef() {
        let values = this.paperdoll.map((ob) => this.fetchItemRaw(ob.id)?.fetchPDef() ?? 0) ?? [];
        return values.reduce((acc, value) => acc + value);
    }

    fetchTotalArmorMDef() {
        let values = this.paperdoll.map((ob) => this.fetchItemRaw(ob.id)?.fetchMDef() ?? 0) ?? [];
        return values.reduce((acc, value) => acc + value);
    }

    fetchTotalArmorEvasion() {
        let values = this.paperdoll.map((ob) => this.fetchItemRaw(ob.id)?.fetchEvasion() ?? 0) ?? [];
        return values.reduce((acc, value) => acc + value);
    }

    fetchTotalArmorBonusMp() {
        let values = this.paperdoll.map((ob) => this.fetchItemRaw(ob.id)?.fetchBonusMp() ?? 0) ?? [];
        return values.reduce((acc, value) => acc + value);
    }

    fetchTotalWeaponPAtk() {
        return this.fetchEquippedWeapon()?.fetchPAtk();
    }

    fetchTotalWeaponMAtk() {
        return this.fetchEquippedWeapon()?.fetchMAtk();
    }

    fetchTotalWeaponAtkSpd() {
        return this.fetchEquippedWeapon()?.fetchAtkSpd();
    }

    fetchTotalWeaponCrit() {
        return this.fetchEquippedWeapon()?.fetchCrit();
    }

    fetchTotalWeaponAccur() {
        return this.fetchEquippedWeapon()?.fetchAccur();
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
