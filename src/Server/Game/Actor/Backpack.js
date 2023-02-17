class Backpack {
    constructor(items) {
        this.raw = items;
    }

    unequipGear(session, slot) {
        // Find item and set as unequipped
        let item = this.items.find(obj => obj.id === session.player.paperdoll.raw[bodyPartId].id);

        if (item !== undefined) {
            session.player.paperdoll.unequip(bodyPartId);
            item.isEquipped = false;

            // Move item to the end
            this.items = this.items.filter(obj => obj.id !== item.id);
            this.items.push(item);
        }
    }
}

module.exports = Backpack;
