let ServerPacket = require('./ServerPacket');

class ServerMethods {
    static handshake() {
        let packet = new ServerPacket(9);

        packet
            .writeC(0x00)      // Opcode
            .writeD(0x3ed779c) // Session ID
            .writeD(0x785a);   // Protocol

        return packet.buffer;
    }
}

module.exports = ServerMethods;
