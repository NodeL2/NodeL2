const ServerPacket = invoke('Packet/Server');

function versionCheck(isProtocolValid, config) {
    const packet = new ServerPacket(0x2e);

    packet
        .writeC(isProtocolValid)
        .writeC(0x00) // XOR Key 1
        .writeC(0x00) // XOR Key 2
        .writeC(0x00) // XOR Key 3
        .writeC(0x00) // XOR Key 4
        .writeC(0x00) // XOR Key 5
        .writeC(0x00) // XOR Key 6
        .writeC(0x00) // XOR Key 7
        .writeC(0x00) // XOR Key 8
        .writeD(0x01) // ?
        .writeD(config.id)  // Server ID
        .writeC(0x01) // ?
        .writeD(0x00) // Obfuscation Key
        .writeC(config.classic);

    return packet.fetchBuffer();
}

module.exports = versionCheck;
