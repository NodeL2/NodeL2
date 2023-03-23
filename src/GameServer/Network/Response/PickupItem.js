const SendPacket = invoke('Packet/Send');

function pickupItem(actorId, item) {
    const packet = new SendPacket(0x0d);

    packet
        .writeD(actorId)
        .writeD(item.fetchId())
        .writeD(item.fetchLocX())
        .writeD(item.fetchLocY())
        .writeD(item.fetchLocZ());

    return packet.fetchBuffer();
}

module.exports = pickupItem;
