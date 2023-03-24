const SendPacket = invoke('Packet/Send');

function charCreateSuccess() {
    const packet = new SendPacket(0x19);

    packet
        .writeD(0x25);

    return packet.fetchBuffer();
}

module.exports = charCreateSuccess;
