const ServerPacket = invoke('Packet/Server');

function charCreateSuccess() {
    const packet = new ServerPacket(0x19);

    packet
        .writeD(0x01);

    return packet.fetchBuffer();
}

module.exports = charCreateSuccess;
