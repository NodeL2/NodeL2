class BackpackModel {
    constructor(data) {
        this.items = [];
        this.paperdoll = data;
    }

    // Enum
    equipment = {
          earr:  1,
          earl:  2,
          neck:  3,
            fr:  4,
            fl:  5,
          head:  6,
        weapon:  7,
        shield:  8,
         hands:  9,
         chest: 10,
         pants: 11,
          feet: 12,
          dual: 14,
         armor: 15,
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
        return this.fetchItems().find(ob => ob.isArmor () && ob.fetchEquipped() && ob.fetchSlot() === slot);
    }

    fetchEquippedWeapon() {
        return this.fetchItems().find(ob => ob.isWeapon() && ob.fetchEquipped());
    }

    fetchTotalArmorPDef(spellcaster) {
        const equip = this.equipment;

        return (
            (this.fetchEquippedArmor(equip.head )?.fetchPDef() ?? (12)) +
            (this.fetchEquippedArmor(equip.chest)?.fetchPDef() ?? (spellcaster ? 15 : 31)) +
            (this.fetchEquippedArmor(equip.pants)?.fetchPDef() ?? (spellcaster ?  8 : 18)) +
            (this.fetchEquippedArmor(equip.hands)?.fetchPDef() ?? ( 8)) +
            (this.fetchEquippedArmor(equip.feet )?.fetchPDef() ?? ( 7))
        );
    }

    fetchTotalArmorMDef() {
        const equip = this.equipment;

        return (
            (this.fetchEquippedArmor(equip.neck)?.fetchMDef() ?? 13) +
            (this.fetchEquippedArmor(equip.earr)?.fetchMDef() ??  9) +
            (this.fetchEquippedArmor(equip.earl)?.fetchMDef() ??  9) +
            (this.fetchEquippedArmor(equip.fr  )?.fetchMDef() ??  5) +
            (this.fetchEquippedArmor(equip.fl  )?.fetchMDef() ??  5)
        );
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

    fetchTotalWeaponCritical() {
        return this.fetchEquippedWeapon()?.fetchCritical();
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
