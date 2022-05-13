const ServerPacket = invoke('Packet/Server');

function initLS(sessionId, serverProtocol, blowfish) {
    const packet = new ServerPacket(0x00);

    packet
        .writeD(sessionId)
        .writeD(serverProtocol)
        .writeB(require('rsa-raw').scrambleMod())
        .writeB(Buffer.alloc(16))  // GameGuard
        .writeB(blowfish)
        .writeC(0x00)              // Termination
        .writeB(Buffer.alloc(14)); // XOR

    // XOR encode contents
    packet.buffer = invoke('Cipher/XOR').encipher(packet.buffer);
    return packet.fetchBuffer(false);
}

module.exports = initLS;
