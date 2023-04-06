const ServerResponse = invoke('GameServer/Network/Response');
const DataCache      = invoke('GameServer/DataCache');
const Database       = invoke('Database');

function purchaseItem(session, selfId, amount) {
    const actor = session.actor;
    const backpack = actor.backpack;

    backpack.stackableExists(selfId).then((item) => { // Stackable item exists
        const itemId = item.fetchId();
        const total  = item.fetchAmount() + amount;

        Database.updateItemAmount(actor.fetchId(), itemId, total).then(() => {
            backpack.updateAmount(itemId, total);
            session.dataSendToMe(ServerResponse.userInfo(session.actor));
            session.dataSendToMe(ServerResponse.itemsList(backpack.fetchItems()));
        });
    }).catch(() => { // New item
        DataCache.fetchItemFromSelfId(selfId, (item) => {
            Database.setItem(actor.fetchId(), {
                  selfId: item.selfId,
                    name: item.template.name,
                  amount: amount,
                equipped: false,
                    slot: item.etc.slot
            }).then((packet) => {
                backpack.insertItem(Number(packet.insertId), selfId, { amount: amount });
                session.dataSendToMe(ServerResponse.userInfo(session.actor));
                session.dataSendToMe(ServerResponse.itemsList(backpack.fetchItems()));
            });
        });
    });
}

module.exports = purchaseItem;
