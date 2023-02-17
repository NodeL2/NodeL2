class Backpack {
    constructor(items) {
        this.items = items;
    }

    fetchItems() {
        return this.items;
    }

    unequipGear(session, slot) {
        // Find the correct item
        const item = this.items.find(ob => ob.id === session.actor.paperdoll.fetchId(slot));
        item.equipped = false;

        // Unequip from actor
        session.actor.paperdoll.unequip(slot);

        // Move item to the end (not official?)
        this.items = this.items.filter(ob => ob.id !== item?.id);
        this.items.push(item);
    }
}

module.exports = Backpack;
