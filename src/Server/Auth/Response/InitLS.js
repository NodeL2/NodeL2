let ServerPacket = invoke('Packet/Server');

function initLS(serverProtocol) {
    let packet = new ServerPacket(0x00);
    let rsa = invoke('Cipher/RSA').scrambleModulus();
    let blowfish = [0x6b,0x60,0xcb,0x5b,0x82,0xce,0x90,0xb1,0xcc,0x2b,0x6c,0x55,0x6c,0x6c,0x6c,0x6c];

    packet
        .writeD(0x44ec9f5c)        // Session ID
        .writeD(serverProtocol)    // Protocol
        .writeB(rsa)               // RSA Public Key
        .writeB(Buffer.alloc(16))  // GameGuard
        .writeB(blowfish)          // BlowFish Key
        .writeB(Buffer.alloc(20)); // Termination

    // TODO: XOR Encode contents first

    return packet.fetchBuffer(false);
}

module.exports = initLS;
