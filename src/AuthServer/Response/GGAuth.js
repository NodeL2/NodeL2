let ServerPacket = invoke('ServerPacket');

function authGG(sessionId) {
    let packet = new ServerPacket(0x0b);

    packet
        .writeD(sessionId);

    return packet.fetchBuffer();
}

module.exports = authGG;
