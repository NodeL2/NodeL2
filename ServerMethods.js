let ServerPacket = require('./ServerPacket');

class ServerMethods {
    static init() {
        let packet = new ServerPacket(9);

        packet
            .writeC(0x00)       // Opcode
            .writeD(0x03ed779c) // Session ID
            .writeD(0x785a);    // Protocol

        return packet.buffer;
    }
}

module.exports = ServerMethods;
