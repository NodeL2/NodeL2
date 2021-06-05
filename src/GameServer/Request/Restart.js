let ClientPacket = invoke('ClientPacket');
let Database = invoke('Database');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function restart(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC();

    let data = {
    };

    session.sendData(
        GameServerResponse.restart()
    );

    Database.getCharacters(session.accountId)
        .then((rows) => {

            session.sendData(
                GameServerResponse.charSelectInfo(rows)
            );
        });
}

module.exports = restart;
