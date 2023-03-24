const SendPacket = invoke('Packet/Send');

function charTemplates() {
    const packet = new SendPacket(0x23);

    packet
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = charTemplates;
