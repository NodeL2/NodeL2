const SendPacket = invoke('Packet/Send');

function spawnItem(item) {
    const packet = new SendPacket(0x0b);

    packet
        .writeD(item.fetchId())
        .writeD(item.fetchSelfId())
        .writeD(item.fetchLocX())
        .writeD(item.fetchLocY())
        .writeD(item.fetchLocZ())
        .writeD(0x00)  // ?
        .writeD(item.fetchAmount());

    return packet.fetchBuffer();
}

module.exports = spawnItem;
