const SendPacket = invoke('Packet/Send');

function initLS(sessionId, serverProtocol) {
    const packet = new SendPacket(0x00);

    packet
        .writeD(sessionId)
        .writeD(serverProtocol)
        .writeB(require('rsa-raw').scrambleMod());

    return packet.fetchBuffer(false);
}

module.exports = initLS;
