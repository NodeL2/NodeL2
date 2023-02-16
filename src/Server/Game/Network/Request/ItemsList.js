const ServerResponse = invoke('Server/Game/Network/Response');
const Database       = invoke('Server/Database');

function itemsList(session, buffer) {
    Database.fetchItems(session.actor.fetchId()).then((items) => {
        session.dataSend(
            ServerResponse.itemsList(items)
        );
    });
}

module.exports = itemsList;
