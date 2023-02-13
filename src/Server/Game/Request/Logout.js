const ServerResponse = invoke('Server/Game/Response');

function logout(session, buffer) {
    session.dataSend(
        ServerResponse.logoutSuccess()
    );
}

module.exports = logout;
