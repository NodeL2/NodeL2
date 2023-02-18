const ServerResponse = invoke('Server/Game/Network/Response');

function appeared(session, buffer) {
    session.dataSend(
        ServerResponse.userInfo(session.actor)
    );
}

module.exports = appeared;
