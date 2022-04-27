let ServerPacket = invoke('ServerPacket');

function initLS(serverProtocol) {
    let packet = new ServerPacket(0x00);
    let rsa = invoke('Cipher/RSA').scrambleModulus();

    packet
        .writeD(0x00228afd)     // Session ID
        .writeD(serverProtocol) // Protocol
        .writeB(rsa);           // RSA Public Key

    return packet.fetchBuffer(false);
}

module.exports = initLS;
