const SendPacket = invoke('Packet/Send');

function spawnItem(item) {
    const packet = new SendPacket(0x15);

    packet
        .writeD(item.fetchId())
        .writeD(item.fetchSelfId())
        .writeD(item.fetchLocX())
        .writeD(item.fetchLocY())
        .writeD(item.fetchLocZ())
        .writeD(item.fetchStackable())
        .writeD(item.fetchAmount());

    return packet.fetchBuffer();
}

module.exports = spawnItem;
