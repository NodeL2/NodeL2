const ServerPacket = invoke('Packet/Server');

function loginSuccess(config) {
    const packet = new ServerPacket(0x03);

    packet
        .writeD(config.sessionKey1) // Session Key (first)
        .writeD(config.sessionKey2) // Session Key (last)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x000003ea)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x00)
        .writeB(Buffer.alloc(16));

    return packet.fetchBuffer();
}

module.exports = loginSuccess;
