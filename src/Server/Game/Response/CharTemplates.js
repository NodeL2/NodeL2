let ServerPacket = invoke('Packet/Server');

function charTemplates() {
    let packet = new ServerPacket(0x17);

    packet
        .writeD(0x00);

    invoke('Utils').totalMemUsed();
    return packet.fetchBuffer();
}

module.exports = charTemplates;
