const ServerResponse = invoke('Server/Game/Network/Response');
const ReceivePacket  = invoke('Server/Packet/Receive');

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
    utils.infoWarn('GameServer:: actor stopped');

    session.dataSend(
        ServerResponse.stopMove(session.actor.fetchId(), data)
    );
}

module.exports = stopMove;
