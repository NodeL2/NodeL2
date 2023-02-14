const ServerResponse = invoke('Server/Game/Network/Response');

function enterCharCreation(session, buffer) {
    session.dataSend(
        ServerResponse.charTemplates()
    );
}

module.exports = enterCharCreation;
