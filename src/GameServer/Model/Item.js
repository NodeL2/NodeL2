class ItemModel {
    constructor(data) {
        this.model = data;
    }

    // Set

    setId(data) {
        this.model.id = data;
    }

    setAmount(data) {
        this.model.amount = data;
    }

    // Get

    fetchId() {
        return this.model.id ?? 0;
    }

    fetchSelfId() {
        return this.model.selfId ?? 0;
    }

    fetchName() {
        return this.model.name ?? '';
    }

    fetchKind() {
        return this.model.kind ?? '';
    }

    fetchOwner() {
        return this.model.characterId ?? 0;
    }

    fetchAmount() {
        return this.model.amount ?? 1;
    }

    fetchClass1() {
        return this.model.class1 ?? 0;
    }

    fetchClass2() {
        return this.model.class1 ?? 0;
    }

    fetchMass() {
        return this.model.mass ?? 0;
    }

    fetchPrice() {
        return this.model.price ?? 0;
    }

    fetchLocX() {
        return this.model.locX ?? 0;
    }

    fetchLocY() {
        return this.model.locY ?? 0;
    }

    fetchLocZ() {
        return this.model.locZ ?? 0;
    }

    // Abstract

    isWearable() {
        return ['Armor', 'Weapon'].includes(this.fetchKind());
    }
}

module.exports = ItemModel;
