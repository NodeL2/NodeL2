const ServerResponse = invoke('Server/Game/Network/Response');

function itemsList(session, buffer) {
    session.dataSend(
        ServerResponse.itemsList(session.actor.backpack.fetchItems())
    );
}

module.exports = itemsList;
