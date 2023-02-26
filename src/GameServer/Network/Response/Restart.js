const SendPacket = invoke('Packet/Send');

function restart() {
    const packet = new SendPacket(0x5f);

    packet
        .writeD(0x01);

    return packet.fetchBuffer();
}

module.exports = restart;
