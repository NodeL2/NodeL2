const ServerResponse = invoke('Server/Game/Response');

function itemList(session, buffer) {
    session.dataSend(
        ServerResponse.itemList()
    );
}

module.exports = itemList;
