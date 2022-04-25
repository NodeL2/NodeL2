let ServerPacket = invoke('ServerPacket');

function initLS(serverProtocol) {
    let packet = new ServerPacket(0x00);
    let rsa = invoke('RSA').scrambleModulus();

    packet
        .writeD(0x00228afd)     // Session ID
        .writeD(0xc621) // Protocol
        .writeB(rsa)           // RSA Public Key
        .writeD(0x29dd954e)
        .writeD(0x77c39cfc)
        .writeD(0x97adb620)
        .writeD(0x07bde0f7);

    return packet.fetchBuffer(false);
}

module.exports = initLS;
