// User define
let Config = require('./Config');
let AuthServerPacket = require('./AuthServerPacket');

class AuthServerMethods {
    static handshake() {
        let packet = new AuthServerPacket(9);

        packet
            .writeC(0x00)       // Opcode
            .writeD(0x03ed779c) // Session ID
            .writeD(0x785a);    // Protocol

        return packet.buffer;
    }

    static loginSuccess() {
        let packet = new AuthServerPacket(48);

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

    static loginFail(errorCode) {
        let packet = new AuthServerPacket(16);

        packet
            .writeC(0x01)       // Opcode
            .writeC(errorCode); // Failure reason

        return packet.buffer;
    }

    static serverList(host, port) {
        host = host.split('.');

        let packet = new AuthServerPacket(20);

        packet
            .writeC(0x04)    // Opcode
            .writeC(1)       // Number of servers
            .writeC(0)       // LS Number
            .writeC(1)       // Server ID
            .writeC(host[0]) // Server IP
            .writeC(host[1]) // Server IP
            .writeC(host[2]) // Server IP
            .writeC(host[3]) // Server IP
            .writeD(port)    // Server port
            .writeC(100)     // Age limit
            .writeC(0)       // PVP ? 1 = Yes, 0 = No
            .writeH(0)       // Current player
            .writeH(500)     // Max player
            .writeC(1);      // Status ? 1 = Up, 0 = Down

        return packet.buffer;
    }

    static playOk(sessionKey) {
        let packet = new AuthServerPacket(12);

        packet
            .writeC(0x07)           // Opcode
            .writeD(sessionKey[0])  // Session Key (first)
            .writeD(sessionKey[1]); // Session Key (last)

        return packet.buffer;
    }

    static playFail(errorCode) {
        let packet = new AuthServerPacket(12);

        packet
            .writeC(0x06)       // Opcode
            .writeC(errorCode); // Failure reason

        return packet.buffer;
    }
}

module.exports = AuthServerMethods;
