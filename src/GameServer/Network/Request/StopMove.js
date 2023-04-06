const ServerResponse = invoke('GameServer/Network/Response');
const ReceivePacket  = invoke('Packet/Receive');

function stopMove(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // X
        .readD()  // Y
        .readD()  // Z
        .readD(); // Head

    consume(session, {
        locX: packet.data[0],
        locY: packet.data[1],
        locZ: packet.data[2],
        head: packet.data[3],
    });
}

function consume(session, data) {
    utils.infoWarn('GameServer', 'stopped actor');
    session.dataSend(ServerResponse.stopMove(session.actor.fetchId(), data), true);
}

module.exports = stopMove;
