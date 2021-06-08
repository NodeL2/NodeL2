let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function stopMove(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD()  // X
        .readD()  // Y
        .readD()  // Z
        .readD(); // Heading

    let data = {
        x: packet.data[1],
        y: packet.data[2],
        z: packet.data[3],
    };

    session.player.model.x = data.x;
    session.player.model.y = data.y;
    session.player.model.z = data.z;

    session.sendData(GameServerResponse.stopMoveWithLocation(session.player));
}

module.exports = stopMove;
