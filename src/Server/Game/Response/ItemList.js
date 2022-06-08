const ServerPacket = invoke('Packet/Server');

function itemList() {
    const packet = new ServerPacket(0x11);

    packet
        .writeH(0x01)
        .writeH(0x00); // Items amount

    return packet.fetchBuffer();
}

module.exports = itemList;
