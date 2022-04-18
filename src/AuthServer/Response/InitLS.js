let ServerPacket = invoke('ServerPacket');

exports.initLS = (serverProtocol) => {
    let packet = new ServerPacket(0x00);

    packet
        .writeD(0x03ed779c)      // Session ID
        .writeD(serverProtocol); // Protocol

    packet
        .writeD(0x03ed779c)      // Session ID
        .writeD(serverProtocol)  // Protocol
        .writeB(-1)              // RSA Public Key
        .writeD(0x29dd954e)      // ?
        .writeD(0x77c39cfc)      // ?
        .writeD(0x97adb620)      // ?
        .writeD(0x07bde0f7)      // ?
        .writeB(-1)              // BlowFish key
        .writeC(0x00);           // Termination

    return packet.fetchBuffer();
};

// [0x6b,0x60,0xcb,0x5b,0x82,0xce,0x90,0xb1,0xcc,0x2b,0x6c,0x55,0x6c,0x6c,0x6c,0x6c]
