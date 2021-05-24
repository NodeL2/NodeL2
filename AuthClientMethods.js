// User define
let AuthClientPacket = require('./AuthClientPacket');
let Utils = require('./Utils');

class AuthClientMethods {
    static authorizeLogin(buffer) {
        let packet = new AuthClientPacket(buffer);

        packet
            .readC()
            .readS(14)  // Username
            .readS(16); // Password

        return {
            username: Utils.toAsciiStripNull(packet.data[1]),
            password: Utils.toAsciiStripNull(packet.data[2]),
        };
    }

    static serverList(buffer) {
        let packet = new AuthClientPacket(buffer);

        packet
            .readC()
            .readD()  // Session Key (first)
            .readD(); // Session Key (last)

        return {
            sessionKey: [
                packet.data[1],
                packet.data[2],
            ]
        };
    }

    static gameLogin(buffer) {
        let packet = new AuthClientPacket(buffer);

        packet
            .readC()
            .readD()  // Session Key (first)
            .readD()  // Session Key (last)
            .readC(); // Server ID

        return {
            sessionKey: [
                packet.data[1],
                packet.data[2],
            ],
            serverID: packet.data[3]
        };
    }
}

module.exports = AuthClientMethods;
