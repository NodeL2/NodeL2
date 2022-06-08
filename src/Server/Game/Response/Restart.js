const ServerPacket = invoke('Packet/Server');

function restart() {
    const packet = new ServerPacket(0x71);

    packet
        .writeD(0x01);

    return packet.fetchBuffer();
}

module.exports = restart;
