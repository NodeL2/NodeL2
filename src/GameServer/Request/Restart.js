let ClientPacket = invoke('ClientPacket');
let Database = invoke('Database');
let GameServerResponse = invoke('GameServer/GameServerResponse');
let World = invoke('GameServer/World');

function restart(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC();

    let data = {
    };

    session.sendData(
        GameServerResponse.restart()
    );

    World.removePlayer(session.player.id);

    Database.getCharacters(session.accountId)
        .then((rows) => {

            session.sendData(
                GameServerResponse.charSelectInfo(rows)
            );
        });
}

module.exports = restart;
