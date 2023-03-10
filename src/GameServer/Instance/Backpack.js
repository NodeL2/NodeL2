const ServerResponse = invoke('GameServer/Network/Response');
const BackpackModel  = invoke('GameServer/Model/Backpack');
const SkillModel     = invoke('GameServer/Model/Skill');
const Item           = invoke('GameServer/Instance/Item');
const DataCache      = invoke('GameServer/DataCache');
const ConsoleText    = invoke('GameServer/ConsoleText');
const Database       = invoke('Database');

class Backpack extends BackpackModel {
    constructor(data) {
        // Parent inheritance
        super(data.paperdoll);
        this.processDetails(data.items);
    }

    processDetails(items) {
        const itemLookup = (id, success) => {
            const item = { ...DataCache.items.find((ob) => ob.selfId === id) };
            item ? success(item) : utils.infoWarn('GameServer:: unknown Item Id %d', id);
        };

        items.push(
            { id: 4900000, selfId: 1665, name: "World Map" },
            { id: 4900001, selfId:   18, name: "Leather Shield" },
            { id: 4900002, selfId:   57, name: "Adena" , amount: 1337 },
            { id: 4900003, selfId: 1061, name: "Potion", amount: 3 }
        ); // TODO: Test data, please delete

        items.forEach((item) => {
            itemLookup(item.selfId, (itemDetails) => {
                this.items.push(new Item(item.id, {
                    ...item, ...utils.crushOb(itemDetails)
                }));
            });
        });
    }

    useItem(session, id) {
        const itemLookup = (id, success) => {
            const item = this.items.find(ob => ob.fetchId() === id);
            item ? success(item) : utils.infoWarn('GameServer:: unknown Item Id %d', id);
        };

        itemLookup(id, (item) => {
            if (item.fetchKind() === 'Armor') {
                this.unequipGear(session, item.fetchSlot());
                this.equipPaperdoll(item.fetchSlot(), item.fetchId(), item.fetchSelfId());
                ConsoleText.transmit(session, ConsoleText.caption.equipped, [{ kind: ConsoleText.kind.item, value: item.fetchSelfId() }]);
                item.setEquipped(true);

                // Recalculate
                session.actor.setCollectiveAll();
            }
            else
            if (item.fetchKind() === 'Weapon') {
                if (item.fetchSlot() === this.equipment.weapon || item.fetchSlot() === this.equipment.shield) {
                    this.unequipGear(session, this.equipment.duals);
                }
                else
                if (item.fetchSlot() === this.equipment.duals) {
                    this.unequipGear(session, this.equipment.weapon);
                    this.unequipGear(session, this.equipment.shield);
                }

                this.unequipGear(session, item.fetchSlot());
                this.equipPaperdoll(item.fetchSlot(), item.fetchId(), item.fetchSelfId());
                ConsoleText.transmit(session, ConsoleText.caption.equipped, [{ kind: ConsoleText.kind.item, value: item.fetchSelfId() }]);
                item.setEquipped(true);

                // Recalculate
                session.actor.setCollectiveAll();
            }
            else {
                if (item.fetchSelfId() === 1665) { // TODO: This needs to be out of here...
                    session.dataSend(
                        ServerResponse.showMap(item.fetchSelfId())
                    );
                    return;
                }
                else
                if (item.fetchSelfId() === 1061) {
                    const details = utils.crushOb(DataCache.skills.find((ob) => ob.selfId === 2032) ?? {});
                    session.dataSend(
                        ServerResponse.skillStarted(session.actor, session.actor.fetchId(), new SkillModel(details))
                    );
                    return;
                }

                utils.infoWarn('GameServer :: unhandled item action');
            }
        });
    }

    unequipGear(session, slot) {
        const removeItem = (slot, success, fail = () => {}) => {
            const item = this.items.find(ob => ob.fetchId() === this.fetchPaperdollId(slot));
            item ? success(item) : fail;
        };

        // Start a database timer to update equipped state
        this.updateDatabaseTimer(session.actor.fetchId());

        removeItem(slot, (item) => {
            // Unequip from actor
            this.unequipPaperdoll(slot);
            item.setEquipped(false);

            // Move item to the end (not official?)
            this.items = this.items.filter(ob => ob.fetchId() !== item?.fetchId());
            this.items.unshift(item);

            // Recalculate
            session.actor.setCollectiveAll();
        });
    }

    updateDatabaseTimer(characterId) {
        clearTimeout(this.dbTimer);
        this.dbTimer = setTimeout(() => {
            const wearables = this.items.filter((ob) => ob.isWearable()) ?? [];
            wearables.forEach((item) => {
                Database.updateItemEquipState(characterId, item.fetchId(), item.fetchEquipped());
            });
        }, 5000);
    }
}

module.exports = Backpack;
