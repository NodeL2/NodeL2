const SendPacket = invoke('Packet/Send');

function serverClose() {
    const packet = new SendPacket(0x26);

    packet
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = serverClose;
