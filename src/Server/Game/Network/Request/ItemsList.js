const ServerResponse = invoke('Server/Game/Network/Response');

function itemsList(session, buffer) {
    session.dataSend(
        ServerResponse.itemsList()
    );
}

module.exports = itemsList;
