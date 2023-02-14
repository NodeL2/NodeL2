const SendPacket = invoke('Server/Packet/Send');

function charTemplates() {
    const packet = new SendPacket(0x17);

    packet
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = charTemplates;
