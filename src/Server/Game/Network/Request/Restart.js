const ServerResponse = invoke('Server/Game/Network/Response');
const Shared         = invoke('Server/Game/Network/Shared');

function restart(session, buffer) {
    session.dataSend(
        ServerResponse.restart()
    );

    Shared.fetchCharacters(session.accountId).then((characters) => {
        Shared.enterCharacterHall(session, characters);
    });
}

module.exports = restart;
