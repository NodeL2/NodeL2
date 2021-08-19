let ServerPacket = invoke('ServerPacket');

function init() {
    let packet = new ServerPacket(0x00);

    packet
        .writeD(0x03ed779c) // Session ID
        .writeD(0x785a);    // Protocol

    return packet.fetchBuffer();
}

module.exports = init;
