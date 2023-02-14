const SendPacket = invoke('Server/Packet/Send');

function charCreateSuccess() {
    const packet = new SendPacket(0x19);

    packet
        .writeD(0x01);

    return packet.fetchBuffer();
}

module.exports = charCreateSuccess;
