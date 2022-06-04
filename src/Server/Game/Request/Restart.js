let ServerResponse = invoke('Server/Game/Response');
let ClientPacket   = invoke('Packet/Client');
let Database       = invoke('Database');

function restart(session, buffer) {
    let packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    session.dataSend(
        ServerResponse.restart()
    );

    Database.fetchCharacters(session.accountId).then((characters) => {
        session.dataSend(
            ServerResponse.charSelectInfo(characters)
        );
    });
}

module.exports = restart;
