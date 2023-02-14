const ServerResponse = invoke('Server/Game/Network/Response');
const Database       = invoke('Server/Database');

function restart(session, buffer) {
    session.dataSend(
        ServerResponse.restart()
    );

    Database.fetchCharacters(session.accountId).then((userChars) => {
        session.dataSend(
            ServerResponse.charSelectInfo(userChars)
        );
    });
}

module.exports = restart;
