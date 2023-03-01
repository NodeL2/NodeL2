class ItemModel {
    constructor(data) {
        this.model = data;
    }

    // Set

    setId(data) {
        this.model.id = data;
    }

    // Get

    fetchId() {
        return this.model.id;
    }

    fetchSelfId() {
        return this.model.selfId;
    }

    fetchLocX() {
        return this.model.locX;
    }

    fetchLocY() {
        return this.model.locY;
    }

    fetchLocZ() {
        return this.model.locZ ?? 0;
    }
}

module.exports = ItemModel;
