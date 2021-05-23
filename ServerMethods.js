// User define
let Config = require('./Config');
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
            .writeC(0x03)                 // Opcode
            .writeD(Config.sessionKey[0]) // Session Key (first)
            .writeD(Config.sessionKey[1]) // Session Key (last)
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x000003ea)
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x02);

        return packet.buffer;
    }

    static loginFail(reason) {
        let packet = new ServerPacket(16);

        packet
            .writeC(0x01)    // Opcode
            .writeC(reason); // Failure reason

        return packet.buffer;
    }

    static serverList() {
        let packet = new ServerPacket(20);

        packet
            .writeC(0x04) // Opcode
            .writeC(1)    // Number of servers
            .writeC(0)    // LS Number
            .writeC(1)    // Server ID
            .writeC(192)  // Server IP
            .writeC(168)  // Server IP
            .writeC(0)    // Server IP
            .writeC(1)    // Server IP
            .writeD(7777) // Server port
            .writeC(100)  // Age limit
            .writeC(0)    // PVP ? 1 = Yes, 0 = No
            .writeH(0)    // Current player
            .writeH(500)  // Max player
            .writeC(1);   // Status ? 1 = Up, 0 = Down

        return packet.buffer;
    }
}

module.exports = ServerMethods;
