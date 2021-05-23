// User define
let ClientPacket = require('./ClientPacket');
let Utils = require('./Utils');

class ClientMethods {
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
}

module.exports = ClientMethods;
