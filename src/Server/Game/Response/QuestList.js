const ServerPacket = invoke('Packet/Server');

function questList() {
    const packet = new ServerPacket(0x80);

    packet
        .writeH(0x00)
        .writeH(0x00);

    return packet.fetchBuffer();
}

module.exports = questList;
