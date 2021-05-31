let ServerPacket = invoke('ServerPacket');

function playOk(sessionKey) {
    let packet = new ServerPacket(12);

    packet
        .writeC(0x07)
        .writeD(sessionKey[0])  // Session Key (first)
        .writeD(sessionKey[1]); // Session Key (last)

    return packet.buffer;
}

module.exports = playOk;
