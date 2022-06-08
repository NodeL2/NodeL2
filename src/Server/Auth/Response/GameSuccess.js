const ServerPacket = invoke('Packet/Server');

function gameSuccess(config) {
    const packet = new ServerPacket(0x07);

    packet
        .writeD(config.sessionKey1)  // Session Key (first)
        .writeD(config.sessionKey2); // Session Key (last)

    return packet.fetchBuffer();
}

module.exports = gameSuccess;
