let ClientPacket   = invoke('ClientPacket');
let Database       = invoke('Database');
let ServerResponse = invoke('GameServer/Response');

function restart(session, buffer) {
    let packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    session.sendData(
        ServerResponse.restart()
    );

    Database.fetchCharacters(session.accountId).then((rows) => {
        session.sendData(
            ServerResponse.charSelectInfo(rows)
        );
    });
}

module.exports = restart;
