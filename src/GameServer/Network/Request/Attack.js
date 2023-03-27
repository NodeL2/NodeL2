const ReceivePacket = invoke('Packet/Receive');

function attack(session, buffer) {
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
            ctrl: true
    });
}

function consume(session, data) {
    invoke('GameServer/Generics').select(session, session.actor, data);
}

module.exports = attack;
