const ServerPacket = invoke('Packet/Server');

function charTemplates() {
    const packet = new ServerPacket(0x17);

    packet
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = charTemplates;
