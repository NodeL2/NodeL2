let ServerPacket = invoke('ServerPacket');

exports.authGG = (serverProtocol) => {
    let packet = new ServerPacket(0x07);

    packet
        .writeD(0x00228afd)      // Session ID
        .writeD(serverProtocol)  // Protocol
        .writeB(Buffer.alloc(128));              // RSA Public Key
        //.writeD(0x29dd954e)      // ?
        //.writeD(0x77c39cfc)      // ?
        //.writeD(0x97adb620)      // ?
        //.writeD(0x07bde0f7)      // ?
        //.writeC(0x00);           // Termination

    return packet.fetchBuffer(false);
};
