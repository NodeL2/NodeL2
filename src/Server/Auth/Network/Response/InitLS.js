const SendPacket = invoke('Server/Packet/Send');

function initLS(sessionId, serverProtocol) {
    const packet = new SendPacket(0x00);

    packet
        .writeD(sessionId)
        .writeD(serverProtocol);

    return packet.fetchBuffer(false);
}

module.exports = initLS;
