const ServerResponse = invoke('GameServer/Network/Response');

function logout(session, buffer) {

    session.actor?.destructor(session);

    session.dataSend(
        ServerResponse.logoutSuccess()
    );
}

module.exports = logout;
