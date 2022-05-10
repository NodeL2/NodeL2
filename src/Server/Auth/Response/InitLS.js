let ServerPacket = invoke('Packet/Server');

function initLS(serverProtocol) {
    let packet   = new ServerPacket(0x00);
    let rsa      = invoke('Cipher/RSA').scrambleModulus();
    let blowfish = invoke('Cipher/Blowfish').key;

    packet
        .writeD(0x00dbf3c2)        // Session ID
        .writeD(serverProtocol)    // Protocol
        .writeB(rsa)               // RSA Public Key
        .writeB(Buffer.alloc(16))  // GameGuard
        .writeB(blowfish)          // BlowFish Key
        .writeC(0x00)              // Termination
        .writeB(Buffer.alloc(14)); // XOR

    // XOR encode contents
    packet.buffer = invoke('Cipher/XOR').encrypt(packet.buffer);
    return packet.fetchBuffer(false);
}

module.exports = initLS;
