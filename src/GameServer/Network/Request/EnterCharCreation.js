const ServerResponse = invoke('GameServer/Network/Response');

function enterCharCreation(session, buffer) {
    session.dataSendToMe(
        ServerResponse.charTemplates()
    );
}

module.exports = enterCharCreation;
