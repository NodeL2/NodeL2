let ServerPacket = invoke('ServerPacket');

function charTemplates() {
    let packet = new ServerPacket(10);

    packet
        .writeC(0x23)
        .writeD(0x00);

    return packet.buffer;
}

module.exports = charTemplates;
