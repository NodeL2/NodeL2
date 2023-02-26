const SendPacket = invoke('Packet/Send');

function itemsList(items, popup = false) {
    const packet = new SendPacket(0x1b);

    packet
        .writeH(popup)
        .writeH(items.length);

    for (const item of items) {
        packet
            .writeH(item.class1)
            .writeD(item.id)
            .writeD(item.selfId)
            .writeD(item.amount)
            .writeH(item.class2)
            .writeH(0xff)  // ?
            .writeH(item.equipped)
            .writeD(item.equipped ? 2 ** item.slot : 0)
            .writeH(0x00)  // Enchant level
            .writeH(0x00); // ?
    }

    return packet.fetchBuffer();
}

module.exports = itemsList;
