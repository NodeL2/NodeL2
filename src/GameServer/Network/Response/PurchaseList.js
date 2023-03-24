const SendPacket = invoke('Packet/Send');

function purchaseList(items) {
    const packet = new SendPacket(0x1d);

    packet
        .writeD(1337)  // TODO: User's Adena
        .writeD(0x00)  // List Id?
        .writeH(items.length);

    for (const item of items) {
        packet
            .writeH(item.fetchClass1())
            .writeD(item.fetchId())
            .writeD(item.fetchSelfId())
            .writeD(0x00)  // Count?
            .writeH(item.fetchClass2())
            .writeH(0x00); // ?

        if (item.isWearable()) {
            packet
                .writeD(item.fetchSlot())
                .writeH(0x00)  // Enchant
                .writeH(0x00)  // ?
                .writeH(0x00); // ?
        }

        packet
            .writeD(item.fetchPrice());
    }

    return packet.fetchBuffer();
}

module.exports = purchaseList;
