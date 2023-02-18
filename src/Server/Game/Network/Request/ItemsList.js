const ServerResponse = invoke('Server/Game/Network/Response');
const Database       = invoke('Server/Database');

function itemsList(session, buffer) {
    session.dataSend(
        ServerResponse.itemsList(session.actor.backpack.fetchItems())
    );
}

module.exports = itemsList;
