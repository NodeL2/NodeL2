const ServerResponse = invoke('GameServer/Network/Response');
const BackpackModel  = invoke('GameServer/Model/Backpack');
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
        items.push(
            { id: 4900000, selfId: 1665, name: "World Map" },
            { id: 4900001, selfId:   18, name: "Leather Shield" },
            { id: 4900002, selfId:   57, name: "Adena", amount: 1337 },
            { id: 4900003, selfId: 1061, name: "Potion", amount: 3 }
        ); // TODO: Test data, please delete

        items.forEach((item) => {
            const details = DataCache.items.find(ob => ob.selfId === item.selfId);
            this.items.push({
                ...item, ...utils.crushOb(details ?? {})
            });
        });
    }

    useItem(session, id) {
        const intentionItem = (id, success, fail = () => {}) => {
            const item = this.items.find(ob => ob.id === id);
            item ? success(item) : fail();
        };

        intentionItem(id, (item) => {
            if (item.kind === 'Armor') {
                this.unequipGear(session, item.slot);
                this.equipPaperdoll(item.slot, item.id, item.selfId);
                ConsoleText.transmit(session, ConsoleText.caption.equipped, [{ kind: ConsoleText.kind.item, value: item.selfId }]);
                item.equipped = true;

                // Recalculate
                session.actor.setCollectiveAll();
            }
            else
            if (item.kind === 'Weapon') {
                if (item.slot === this.equipment.weapon || item.slot === this.equipment.shield) {
                    this.unequipGear(session, this.equipment.duals);
                }
                else
                if (item.slot === this.equipment.duals) {
                    this.unequipGear(session, this.equipment.weapon);
                    this.unequipGear(session, this.equipment.shield);
                }

                this.unequipGear(session, item.slot);
                this.equipPaperdoll(item.slot, item.id, item.selfId);
                ConsoleText.transmit(session, ConsoleText.caption.equipped, [{ kind: ConsoleText.kind.item, value: item.selfId }]);
                item.equipped = true;

                // Recalculate
                session.actor.setCollectiveAll();
            }
            else {
                if (item.selfId === 1665) { // TODO: This needs to be out of here...
                    session.dataSend(
                        ServerResponse.showMap(item.selfId)
                    );
                    return;
                }
                else
                if (item.selfId === 1061) {
                    session.dataSend(
                        ServerResponse.skillStarted(session.actor, session.actor.fetchId(), { selfId: 2032, hitTime: 0, reuse: 0 })
                    );
                    return;
                }

                utils.infoWarn('GameServer :: unhandled item action');
            }
        });
    }

    unequipGear(session, slot) {
        const removeItem = (slot, success, fail = () => {}) => {
            const item = this.items.find(ob => ob.id === this.fetchPaperdollId(slot));
            item ? success(item) : fail;
        };

        // Start a database timer to update equipped state
        this.updateDatabaseTimer(session.actor.fetchId());

        removeItem(slot, (item) => {
            // Unequip from actor
            this.unequipPaperdoll(slot);
            item.equipped = false;

            // Move item to the end (not official?)
            this.items = this.items.filter(ob => ob.id !== item?.id);
            this.items.unshift(item);

            // Recalculate
            session.actor.setCollectiveAll();
        });
    }

    updateDatabaseTimer(characterId) {
        clearTimeout(this.dbTimer);

        this.dbTimer = setTimeout(() => {
            (this.items.filter(ob => ob.equipped !== undefined) ?? []).forEach((item) => {
                Database.updateItemEquipState(characterId, item);
            });
        }, 5000);
    }
}

module.exports = Backpack;
