let ServerPacket = require('./ServerPacket');

class ServerMethods {
    static handshake() {
        let packet = new ServerPacket(9);

        packet
            .writeC(0x00)       // Opcode
            .writeD(0x03ed779c) // Session ID
            .writeD(0x785a);    // Protocol

        return packet.buffer;
    }

    static loginSuccess() {
        let packet = new ServerPacket(48);

        packet
            .writeC(0x03)
            .writeD(0x55555555) // Session Key (first)
            .writeD(0x44444444) // Session Key (last)
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x000003ea)
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x02);

        return packet.buffer;
    }
}

module.exports = ServerMethods;
