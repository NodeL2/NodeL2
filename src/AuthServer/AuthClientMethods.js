// User define
let ClientPacket = require(__basedir + '/src/ClientPacket');
let Utils = require(__basedir + '/src/Utils');

class AuthClientMethods {
    static authorizeLogin(buffer) {
        let packet = new ClientPacket(buffer);

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
        let packet = new ClientPacket(buffer);

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
        let packet = new ClientPacket(buffer);

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
