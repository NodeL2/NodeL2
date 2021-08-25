let ServerPacket = invoke('ServerPacket');

function initLS(serverProtocol) {
    let packet = new ServerPacket(0x00);

    packet
        .writeD(0x03ed779c)      // Session ID
        .writeD(serverProtocol); // Protocol

    return packet.fetchBuffer();
}

module.exports = initLS;
