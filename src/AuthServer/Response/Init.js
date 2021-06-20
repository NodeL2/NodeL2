let ServerPacket = invoke('ServerPacket');

function init() {
    let packet = new ServerPacket(16); // 9

    packet
        .writeC(0x00)
        .writeD(0x03ed779c) // Session ID
        .writeD(0x785a);    // Protocol

    return packet.buffer;
}

module.exports = init;
