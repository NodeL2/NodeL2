let ServerPacket = invoke('ServerPacket');

function gameSuccess(config) {
    let packet = new ServerPacket(16); // 9

    packet
        .writeC(0x07)
        .writeD(config.sessionKey1)  // Session Key (first)
        .writeD(config.sessionKey2); // Session Key (last)

    return packet.buffer;
}

module.exports = gameSuccess;
