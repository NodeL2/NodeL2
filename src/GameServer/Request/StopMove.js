let ClientPacket   = invoke('ClientPacket');
let ServerResponse = invoke('GameServer/Response');

function stopMove(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD()  // X
        .readD()  // Y
        .readD()  // Z
        .readD(); // Heading

    consume(session, {
        x: packet.data[0],
        y: packet.data[1],
        z: packet.data[2],
    });
}

function consume(session, data) {
    session.player.model.x = data.x;
    session.player.model.y = data.y;
    session.player.model.z = data.z;

    session.sendData(
        ServerResponse.stopMove(session.player)
    );
}

module.exports = stopMove;
