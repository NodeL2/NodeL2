const ServerResponse = invoke('GameServer/Network/Response');

function itemsList(session, buffer) {
    session.dataSend(
        ServerResponse.itemsList(session.actor.backpack.fetchItems(), true)
    );
}

module.exports = itemsList;
