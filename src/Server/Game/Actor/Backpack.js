const ServerResponse = invoke('Server/Game/Network/Response');
const DataCache      = invoke('Server/Game/DataCache');

class Backpack {
    constructor(rawData) {
        rawData.push({ id: 1000, itemId: 1665, name: "World Map" }); // TODO: Temp data, please delete

        this.items = [];
        for (let item of rawData) {
            const details = DataCache.items.find(ob => ob.itemId === item.itemId);
            if (details) {
                this.items.push({
                    ...item, ...utils.crushOb(details)
                });
            }
            else {
                utils.infoWarn('GameServer:: can\'t find item details for %d', item.itemId);
            }
        }
    }

    fetchItems() {
        return this.items;
    }

    useItem(session, id) {
        // Find item to use/equip
        const item = this.items.find(ob => ob.id === id);

        if (item) {
            if (item.kind === "Armor" || item.kind === "Weapon") {
                this.unequipGear(session, item.slot);
                session.actor.paperdoll.equip(item.slot, item.id, item.itemId);
                item.equipped = true;
            }
            else {
                if (item.itemId === 1665) { // TODO: This needs to be out of here...
                    session.dataSend(
                        ServerResponse.showMap(item.itemId)
                    );
                    return;
                }

                utils.infoWarn('GameServer:: unhandled item action');
            }
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
