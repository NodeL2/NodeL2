const ServerResponse = invoke('Server/Game/Response');

function charCreationScreen(session, buffer) {
    session.dataSend(
        ServerResponse.charTemplates()
    );
}

module.exports = charCreationScreen;
