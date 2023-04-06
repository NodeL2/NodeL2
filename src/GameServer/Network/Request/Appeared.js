const ServerResponse = invoke('GameServer/Network/Response');

function appeared(session, buffer) {
    session.dataSend(ServerResponse.userInfo(session.actor), session.actor);
}

module.exports = appeared;
