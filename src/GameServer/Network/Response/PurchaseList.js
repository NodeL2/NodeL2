const SendPacket = invoke('Packet/Send');

function purchaseList(items, adena) {
    const packet = new SendPacket(0x11);

    packet
        .writeD(adena)
        .writeD(0x00) // List Id?
        .writeH(utils.size(items));

    items.forEach((item) => {
        packet
            .writeH(item.fetchClass1())
            .writeD(item.fetchId())
            .writeD(item.fetchSelfId())
            .writeD(item.fetchAmount())
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
    });

    return packet.fetchBuffer();
}

module.exports = purchaseList;
