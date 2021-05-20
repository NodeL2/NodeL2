let ServerPacket = require("./ServerPacket");

function initLS() {
    let packet = new ServerPacket(9);

    packet
        .writeC(0x00)
        .writeD(0x03ed779c) // Session ID
        .writeD(0x785a);    // Protocol

    packet.buffer.writeInt16LE(packet.buffer.length);

    return packet.buffer;
}

module.exports = initLS;
