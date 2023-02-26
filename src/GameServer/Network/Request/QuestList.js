const ServerResponse = invoke('GameServer/Network/Response');

function questList(session, buffer) {
    session.dataSend(
        ServerResponse.questList()
    );
}

module.exports = questList;
