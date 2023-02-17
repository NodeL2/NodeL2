const ReceivePacket = invoke('Server/Packet/Receive');

function action(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Destination Id
        .readD()  // Source X
        .readD()  // Source Y
        .readD()  // Source Z
        .readC(); // Action Id (Shift or not)

    consume(session, {
          destId: packet.data[0],
            locX: packet.data[1],
            locY: packet.data[2],
            locZ: packet.data[3],
        actionId: packet.data[4],
    });
}

function consume(session, data) {
    session.actor.select(session, data);
}

module.exports = action;
