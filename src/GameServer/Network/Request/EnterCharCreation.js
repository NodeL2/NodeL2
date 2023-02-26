const ServerResponse = invoke('GameServer/Network/Response');

function enterCharCreation(session, buffer) {
    session.dataSend(
        ServerResponse.charTemplates()
    );
}

module.exports = enterCharCreation;
