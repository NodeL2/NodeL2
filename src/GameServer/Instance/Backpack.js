const ServerResponse = invoke('GameServer/Network/Response');
const BackpackModel  = invoke('GameServer/Model/Backpack');
const DataCache      = invoke('GameServer/DataCache');
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
            { id: 4900002, selfId:   57, name: "Adena", amount: 1337 }
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
            if (item.kind === "Armor") {
                this.unequipGear(session, item.slot);
                this.equipPaperdoll(item.slot, item.id, item.selfId);
                item.equipped = true;

                // Recalculate bonus
                session.actor.setCollectiveTotalMp();
            }
            else
            if (item.kind === "Weapon") {
                if (item.slot ===  7 || item.slot === 8) {
                    this.unequipGear(session, 14); // Both hands
                }
                else
                if (item.slot === 14) {
                    this.unequipGear(session,  7); // R
                    this.unequipGear(session,  8); // L
                }

                this.unequipGear(session, item.slot);
                this.equipPaperdoll(item.slot, item.id, item.selfId);
                item.equipped = true;
            }
            else {
                if (item.selfId === 1665) { // TODO: This needs to be out of here...
                    session.dataSend(
                        ServerResponse.showMap(item.selfId)
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

            // Recalculate bonus
            session.actor.setCollectiveTotalMp();
        });
    }

    fetchTotalLoad() {
        let totalLoad = 0;

        this.items.forEach((item) => {
            totalLoad += item.mass ?? 0;
        });

        return totalLoad;
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
