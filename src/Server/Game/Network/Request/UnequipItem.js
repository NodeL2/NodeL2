const ReceivePacket = invoke('Server/Packet/Receive');

function unequipItem(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Gear Slot

    consume(session, {
        slot: packet.data[0]
    });
}

function consume(session, data) {
    session.actor.backpack.unequipGear(session, Math.log2(data.slot));
}

module.exports = unequipItem;
