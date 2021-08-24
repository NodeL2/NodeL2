let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function charTemplates() {
    let packet = new ChroniclePacket(charTemplates.name);

    packet
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = charTemplates;
