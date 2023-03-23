const ReceivePacket = invoke('Packet/Receive');

function trashItem(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Id
        .readD(); // Count

    consume(session, {
           id: packet.data[0],
        count: packet.data[1],
    });
}

function consume(session, data) {
    session.actor.backpack.deleteItem(session, data.id, data.count);
}

module.exports = trashItem;
