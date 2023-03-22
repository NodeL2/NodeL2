const ReceivePacket = invoke('Packet/Receive');

function validatePosition(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // X
        .readD()  // Y
        .readD()  // Z
        .readD()  // Head
        .readD(); // Vehicle Id

    consume(session, {
        locX: packet.data[0],
        locY: packet.data[1],
        locZ: packet.data[2],
        head: packet.data[3],
    });
}

function consume(session, data) {
    session.actor.updatePosition(data);
}

module.exports = validatePosition;
