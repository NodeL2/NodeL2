const SendPacket = invoke('Server/Packet/Send');

function itemsList(items) {
    const packet = new SendPacket(0x1b);

    packet
        .writeH(0x01)
        .writeH(items.length);

    for (const item of items) {
        packet
            .writeH(item.class1)
            .writeD(item.id)
            .writeD(item.itemId)
            .writeD(0x01)  // Amount
            .writeH(item.class2)
            .writeH(0xff)  // ?
            .writeH(item.equipped)
            .writeD(2 ** item.slot)
            .writeH(0x00)  // Enchant level
            .writeH(0x00); // ?
    }

    return packet.fetchBuffer();
}

module.exports = itemsList;
