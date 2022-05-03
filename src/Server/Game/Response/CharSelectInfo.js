let ServerPacket = invoke('Packet/Server');

function charSelectInfo() {
    let packet = new ServerPacket(0x13);

    packet
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = charSelectInfo;
