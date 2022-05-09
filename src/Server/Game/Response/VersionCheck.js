let ServerPacket = invoke('Packet/Server');

function versionCheck(isProtocolValid) {
    let packet = new ServerPacket(0x2e);

    packet
        .writeC(isProtocolValid)
        .writeC(0x00)  // Exclusive OR Key 1
        .writeC(0x00)  // Exclusive OR Key 2
        .writeC(0x00)  // Exclusive OR Key 3
        .writeC(0x00)  // Exclusive OR Key 4
        .writeC(0x00)  // Exclusive OR Key 5
        .writeC(0x00)  // Exclusive OR Key 6
        .writeC(0x00)  // Exclusive OR Key 7
        .writeC(0x00)  // Exclusive OR Key 8
        .writeD(0x01)  // ?
        .writeD(0x01)  // Server ID
        .writeC(0x01)  // ?
        .writeD(0x00)  // Obfuscation Key
        .writeC(0x01); // Is Classic

    return packet.fetchBuffer();
}

module.exports = versionCheck;
