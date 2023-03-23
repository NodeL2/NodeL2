const ReceivePacket = invoke('Packet/Receive');

function dropItem(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Id
        .readD()  // Count
        .readD()  // X
        .readD()  // Y
        .readD(); // Z

    consume(session, {
           id: packet.data[0],
        count: packet.data[1],
         locX: packet.data[2],
         locY: packet.data[3],
         locZ: packet.data[4],
    });
}

function consume(session, data) {
    session.actor.backpack.dropItem(session, data.id, data.count, data.locX, data.locY, data.locZ);
}

module.exports = dropItem;
