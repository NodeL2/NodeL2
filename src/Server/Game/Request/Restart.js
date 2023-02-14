const ServerResponse = invoke('Server/Game/Response');
const Database       = invoke('Database');

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
