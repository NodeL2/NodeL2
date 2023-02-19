const SendPacket = invoke('Server/Packet/Send');

function authGG(sessionId) {
    const packet = new SendPacket(0x0b);

    packet
        .writeD(sessionId);

    return packet.fetchBuffer();
}

module.exports = authGG;
