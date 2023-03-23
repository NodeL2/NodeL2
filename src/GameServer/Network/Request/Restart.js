const ServerResponse = invoke('GameServer/Network/Response');
const Shared         = invoke('GameServer/Network/Shared');

function restart(session, buffer) {

    session.actor?.destructor();

    session.dataSend(
        ServerResponse.restart()
    );

    Shared.fetchCharacters(session.accountId).then((characters) => {
        Shared.enterCharacterHall(session, characters);
    });
}

module.exports = restart;
