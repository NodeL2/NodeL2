const ServerPacket = invoke('Packet/Server');

function charNameCreatable(resultCode) {
    const packet = new ServerPacket(0xfe);

    packet
        .writeH(0x10b)
        .writeD(resultCode);

    return packet.fetchBuffer();
}

module.exports = charNameCreatable;
