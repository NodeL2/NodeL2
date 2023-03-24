const SendPacket = invoke('Packet/Send');

function restart() {
    const packet = new SendPacket(0x74);

    packet
        .writeD(0x01);

    return packet.fetchBuffer();
}

module.exports = restart;
