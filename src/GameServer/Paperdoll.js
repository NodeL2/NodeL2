global.BodyPart = {
    RIGHT_HAND: 128,
    CHEST: 1024,
    LEGS: 2048
};

class Paperdoll {
    constructor() {
        this.raw = [];
        this.raw[BodyPart.RIGHT_HAND] = { id: 0, itemId: 0 };
        this.raw[BodyPart.CHEST]      = { id: 0, itemId: 0 };
        this.raw[BodyPart.LEGS]       = { id: 0, itemId: 0 };
    }

    equip(bodyPartId, id, itemId) {
        this.raw[bodyPartId].id = id;
        this.raw[bodyPartId].itemId = itemId;
    }

    unequip(bodyPartId) {
        this.raw[bodyPartId].id = 0;
        this.raw[bodyPartId].itemId = 0;
    }
}

module.exports = Paperdoll;
