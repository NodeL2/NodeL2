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

        data.items.push(
            { id: 4900000, selfId: 1665, name: "World Map" },
            { id: 4900001, selfId: 1863, name: "Map: Elmore" },
            { id: 4900002, selfId:   18, name: "Leather Shield" },
            { id: 4900003, selfId:   57, name: "Adena" , amount: 1337 },
            { id: 4900004, selfId: 1061, name: "Potion", amount: 3 }
        ); // TODO: Test data, please delete

        data.items.forEach((item) => {
            this.insertItem(item.id, item.selfId, item);
        });
    }

    insertItem(id, selfId, item = {}) {
        DataCache.fetchItemFromSelfId(selfId, (itemDetails) => {
            this.items.push(new Item(id, {
                ...item, ...utils.crushOb(itemDetails)
            }));
        });
    }

    useItem(session, id) {
        this.fetchItem(id, (item) => {
            if (item.isWearable()) {
                const id     = item.fetchId();
                const selfId = item.fetchSelfId();
                const slot   = item.fetchSlot();
                const equip  = this.equipment;

                if (slot === equip.weapon || slot === equip.shield) {
                    this.unequipGear(session, equip.duals);
                }
                else
                if (slot === equip.duals) {
                    this.unequipGear(session, equip.weapon);
                    this.unequipGear(session, equip.shield);
                }
                else
                if (slot === equip.chest || slot === equip.pants) {
                    this.unequipGear(session, equip.armor);
                }
                else
                if (slot === equip.armor) {
                    this.unequipGear(session, equip.chest);
                    this.unequipGear(session, equip.pants);

                    this.equipPaperdoll(equip.chest, id, selfId);
                    this.equipPaperdoll(equip.pants, id, selfId);
                }

                this.unequipGear(session, slot);
                this.equipPaperdoll(slot, id, selfId);
                item.setEquipped(true);
                ConsoleText.transmit(session, ConsoleText.caption.equipped, [{ kind: ConsoleText.kind.item, value: selfId }]);

                // Recalculate
                session.actor.setCollectiveAll();
            }
            else {
                if ([1665, 1863].includes(item.fetchSelfId())) { // TODO: This needs to be out of here...
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
        // Start a database timer to update equipped state
        this.updateDatabaseTimer(session.actor.fetchId());

        this.fetchItem(this.fetchPaperdollId(slot), (item) => {
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
