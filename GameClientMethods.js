// User define
let ClientPacket = require('./ClientPacket');

class GameClientMethods {
    static protocolVersion(buffer) {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readD(); // Protocol Version

        return {
            protocolVersion: packet.data[1]
        };
    }

    static requestAuthLogin(buffer) {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readS()
            .readD()
            .readD()
            .readD()
            .readD();

        return {
            sessionKey: [
                packet.data[3],
                packet.data[2],
            ]
        };
    }

    static newCharacter(buffer) {
        let packet = new ClientPacket(buffer);

        packet
            .readC(); // Status

        return {
            status: packet.data[0]
        };
    }
}

module.exports = GameClientMethods;
