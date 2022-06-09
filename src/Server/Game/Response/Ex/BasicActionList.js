const ServerPacket = invoke('Packet/Server');

function basicActionList() {
    const packet = new ServerPacket(0xfe);

    packet
        .writeH(0x60)
        .writeD(3)
        .writeD(0)
        .writeD(1)
        .writeD(2)
        .writeD(3)
        .writeD(4)
        .writeD(5)
        .writeD(6)
        .writeD(7);

    return packet.fetchBuffer();
}

module.exports = basicActionList;
