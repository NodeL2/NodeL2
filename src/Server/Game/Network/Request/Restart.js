const ServerResponse = invoke('Server/Game/Network/Response');
const Common         = invoke('Server/Game/Network/Common');

function restart(session, buffer) {
    session.dataSend(
        ServerResponse.restart()
    );

    Common.fetchCharacters(session);
}

module.exports = restart;
