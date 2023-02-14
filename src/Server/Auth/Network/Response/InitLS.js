const ServerPacket = invoke('Server/Packet/Server');

function initLS(sessionId, serverProtocol) {
    const packet = new ServerPacket(0x00);

    packet
        .writeD(sessionId)
        .writeD(serverProtocol);

    return packet.fetchBuffer(false);
}

module.exports = initLS;
