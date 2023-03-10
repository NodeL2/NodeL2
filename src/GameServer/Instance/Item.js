const ItemModel = invoke('GameServer/Model/Item');

class Weapon extends ItemModel {
    constructor(id, data) {
        // Parent inheritance
        super(data);

        // Local
        this.setId(id);
    }

    fetchEquipped() {
        return this.model.equipped ?? false;
    }

    fetchSlot() {
        return this.model.slot ?? 0;
    }

    // Get (Weapon)

    fetchPAtk() {
        return this.model.pAtk ?? 0;
    }

    fetchPAtkRnd() {
        return this.model.pAtkRnd ?? 0;
    }

    fetchMAtk() {
        return this.model.mAtk ?? 0;
    }

    fetchAtkSpd() {
        return this.model.atkSpd ?? 0;
    }

    fetchCrit() {
        return this.model.crit ?? 0;
    }

    fetchAccur() {
        return this.model.accur ?? 0;
    }

    fetchConsumedMp() {
        return this.model.mp ?? 0;
    }

    fetchSoulshot() {
        return this.model.soulshot ?? 0;
    }

    fetchSpiritshot() {
        return this.model.spiritshot ?? 0;
    }

   // Get (Armor)

   fetchPDef() {
    return this.model.pDef ?? 0;
    }

    fetchMDef() {
        return this.model.mDef ?? 0;
    }

    fetchEvasion() {
        return this.model.evasion ?? 0;
    }

    fetchBonusMp() {
        return this.model.maxMp ?? 0;
    }

    // Get (Other)

    fetchStackable() {
        return this.model.stackable ?? false;
    }

    fetchConsumable() {
        return this.model.consumable ?? false;
    }
}

module.exports = Weapon;
