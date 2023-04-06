const ServerResponse = invoke('GameServer/Network/Response');

function questList(session, buffer) {
    session.dataSendToMe(
        ServerResponse.questList()
    );
}

module.exports = questList;
