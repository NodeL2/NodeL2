const ReceivePacket = invoke('Packet/Receive');

function action(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Id
        .readD()  // Source X
        .readD()  // Source Y
        .readD()  // Source Z
        .readC(); // Action Id (Shift or not)

    consume(session, {
              id: packet.data[0],
            locX: packet.data[1],
            locY: packet.data[2],
            locZ: packet.data[3],
        actionId: packet.data[4],
            ctrl: false
    });
}

function consume(session, data) {
    session.actor.select(session, data);
}

module.exports = action;
