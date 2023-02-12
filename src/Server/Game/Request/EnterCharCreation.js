const ServerResponse = invoke('Server/Game/Response');

function enterCharCreation(session, buffer) {
    session.dataSend(
        ServerResponse.charTemplates()
    );
}

module.exports = enterCharCreation;
