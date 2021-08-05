let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function charTemplates() {
    let packet = new ChroniclePacket(charTemplates.name, 8);

    packet
        .writeD(0x00);

    return packet.buffer;
}

module.exports = charTemplates;
