let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function stopMove(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD()
        .readD()
        .readD()
        .readD();

    let data = {
        x: packet.data[1],
        y: packet.data[2],
        z: packet.data[3],
        heading: packet.data[4]
    };

    session.player.x = data.x;
    session.player.y = data.y;
    session.player.z = data.z;

    session.sendData(
        GameServerResponse.stopMoveWithLocation(session.player)
    );
}

module.exports = stopMove;
