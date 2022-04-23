let ServerPacket = invoke('ServerPacket');

function authGG(serverProtocol) {
    let packet = new ServerPacket(0x07);

    packet
        .writeD(0x00228afd)         // Session ID
        .writeD(serverProtocol)     // Protocol
        .writeB(Buffer.alloc(128)); // RSA Public Key

    return packet.fetchBuffer(false);
}

module.exports = authGG;
