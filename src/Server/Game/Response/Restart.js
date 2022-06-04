let ServerPacket = invoke('Packet/Server');

function restart() {
    let packet = new ServerPacket(0x71);

    packet
        .writeD(1);

    return packet.fetchBuffer();
}

module.exports = restart;
