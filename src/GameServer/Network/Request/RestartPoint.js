const ServerResponse = invoke('GameServer/Network/Response');
const ReceivePacket  = invoke('Packet/Receive');

function restartPoint(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Restart point

    consume(session, {
        location: packet.data[0]
    });
}

function consume(session, data) {
    session.actor.revive(session);
}

module.exports = restartPoint;
