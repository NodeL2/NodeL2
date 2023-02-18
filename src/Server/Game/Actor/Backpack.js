class Backpack {
    constructor(items) {
        this.items = items;
    }

    fetchItems() {
        return this.items;
    }

    useItem(session, id) {
        // Find item to use/equip
        const item = this.items.find(ob => ob.id === id);

        if (item) {
            this.unequipGear(session, item.slot);
            session.actor.paperdoll.equip(item.slot, item.id, item.itemId);
            item.equipped = true;
        }
    }

    unequipGear(session, slot) {
        // Find the correct item
        const item = this.items.find(ob => ob.id === session.actor.paperdoll.fetchId(slot));

        if (item) {
            item.equipped = false;

            // Unequip from actor
            session.actor.paperdoll.unequip(slot);

            // Move item to the end (not official?)
            this.items = this.items.filter(ob => ob.id !== item?.id);
            this.items.push(item);
        }
    }
}

module.exports = Backpack;
