const ServerResponse = invoke('Server/Game/Response');

function questList(session, buffer) {
    session.dataSend(
        ServerResponse.questList()
    );
}

module.exports = questList;
