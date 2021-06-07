let Database = invoke('Database');

class ActorInventory {
    constructor() {
        this.items = [];
    }

    populate(player) {
        Database.getInventoryItems(player.id)
        .then((rows) => {

            for (let row of rows) {
                this.items.push({
                    id: 2000000 + row.id,
                    itemId: row.item_id,
                    category: row.category,
                    bodyPartId: row.body_part,
                    type1: row.type_1,
                    type2: row.type_2,
                    isEquipped: row.is_equipped
                });
            }

            for (let item of this.items) {
                if (item.isEquipped) {
                    player.paperdoll.equip(item.bodyPartId, item.id, item.itemId);
                }
            }
        });
    }

    useItem(session, id) {
        // Find item use/equip
        let item = this.items.find(obj => obj.id === id);

        if (item !== undefined) {
            if (item.category === WearableItemType.WEAPON || item.category === WearableItemType.ARMOR) {
                this.unequipBodyPart(session, item.bodyPartId);
                session.player.paperdoll.equip(item.bodyPartId, item.id, item.itemId);
                item.isEquipped = true;
            }
            else {
                // TODO: Consumables
            }
        }
    }

    unequipBodyPart(session, bodyPartId) {
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

module.exports = ActorInventory;
