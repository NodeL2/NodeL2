const ServerPacket = invoke('Packet/Server');

function authGG(sessionId) {
    const packet = new ServerPacket(0x0b);

    packet
        .writeD(sessionId);

    return packet.fetchBuffer();
}

module.exports = authGG;
