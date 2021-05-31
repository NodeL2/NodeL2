let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function moveToLocation(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD()
        .readD()
        .readD()
        .readD()
        .readD()
        .readD();

    let data = {
        origin: {
            x: packet.data[4],
            y: packet.data[5],
            z: packet.data[6],
        },
        target: {
            x: packet.data[1],
            y: packet.data[2],
            z: packet.data[3],
        }
    };

    session.sendData(
        GameServerResponse.moveToLocation(session.player.id, data), false
    );
}

module.exports = moveToLocation;
