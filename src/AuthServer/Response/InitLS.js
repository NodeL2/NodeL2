let ServerPacket = invoke('ServerPacket');

function initLS(serverProtocol) {
    let packet = new ServerPacket(0x00);

    packet
        .writeD(0x00228afd)         // Session ID
        .writeD(serverProtocol)     // Protocol
        .writeB(Buffer.alloc(128)); // RSA Public Key

    return packet.fetchBuffer(false);
}

module.exports = initLS;
