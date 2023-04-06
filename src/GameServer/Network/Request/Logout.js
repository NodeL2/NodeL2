const ServerResponse = invoke('GameServer/Network/Response');

function logout(session, buffer) {

    session.actor?.destructor();

    session.dataSendToMe(
        ServerResponse.logoutSuccess()
    );
}

module.exports = logout;
