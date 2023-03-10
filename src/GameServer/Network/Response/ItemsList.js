const SendPacket = invoke('Packet/Send');

function itemsList(items, popup = false) {
    const packet = new SendPacket(0x1b);

    packet
        .writeH(popup)
        .writeH(items.length);

    for (const item of items) {
        packet
            .writeH(item.fetchClass1())
            .writeD(item.fetchId())
            .writeD(item.fetchSelfId())
            .writeD(item.fetchAmount())
            .writeH(item.fetchClass2())
            .writeH(0xff)  // ?
            .writeH(item.fetchEquipped())
            .writeD(item.fetchEquipped() ? 2 ** item.fetchSlot() : 0)
            .writeH(0x00)  // Enchant level
            .writeH(0x00); // ?
    }

    return packet.fetchBuffer();
}

module.exports = itemsList;
