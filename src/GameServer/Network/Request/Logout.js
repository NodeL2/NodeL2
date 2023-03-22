const ServerResponse = invoke('GameServer/Network/Response');

function logout(session, buffer) {

    session.actor?.destructor();

    session.dataSend(
        ServerResponse.logoutSuccess()
    );
}

module.exports = logout;
