let ServerPacket = invoke('ServerPacket');

function loginSuccess(config) {
    let packet = new ServerPacket(40);

    packet
        .writeC(0x03)
        .writeD(config.sessionKey1) // Session Key (first)
        .writeD(config.sessionKey2) // Session Key (last)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x000003ea)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x02);

    return packet.buffer;
}

module.exports = loginSuccess;
