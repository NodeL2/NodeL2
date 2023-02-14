const ServerResponse = invoke('Server/Game/Network/Response');

function questList(session, buffer) {
    session.dataSend(
        ServerResponse.questList()
    );
}

module.exports = questList;
