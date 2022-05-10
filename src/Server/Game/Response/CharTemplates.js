let ServerPacket = invoke('Packet/Server');

function charTemplates() {
    let packet = new ServerPacket(0x0d);

    packet
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = charTemplates;
