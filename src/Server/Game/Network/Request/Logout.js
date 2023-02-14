const ServerResponse = invoke('Server/Game/Network/Response');

function logout(session, buffer) {
    session.dataSend(
        ServerResponse.logoutSuccess()
    );
}

module.exports = logout;
