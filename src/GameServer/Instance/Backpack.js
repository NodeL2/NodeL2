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

        data.items.forEach((item) => {
            this.insertItem(item.id, item.selfId, item);
        });
    }

    insertItem(id, selfId, item = {}) { // TODO: Price still 0 with admin shop
        DataCache.fetchItemFromSelfId(selfId, (itemDetails) => {
            this.items.push(new Item(id, {
                ...item, ...utils.crushOb(itemDetails)
            }));
        });
    }

    updateAmount(id, amount) {
        this.fetchItem(id, (item) => { item.setAmount(amount); });
    }

    useItem(session, id) {
        this.fetchItem(id, (item) => {
            if (item.isWearable()) {
                this.equipGear(session, item);
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

    equipGear(session, item) {
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
        }

        this.unequipGear(session, slot);
        this.equipPaperdoll(slot, item.fetchId(), item.fetchSelfId());
        item.setEquipped(true);
        ConsoleText.transmit(session, ConsoleText.caption.equipped, [
            { kind: ConsoleText.kind.item, value: item.fetchSelfId() }
        ]);

        // Recalculate
        session.actor.setCollectiveAll();
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
        }, 3000);
    }
}

module.exports = Backpack;
