let ClientPacket = require('./ClientPacket.js');

class ClientMethods {
    static authorizeLogin(buffer) {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readS(14)  // Username
            .readS(16); // Password

        return {
            username: packet.data[1].toString('ascii').replace(/\u0000/gi, ''),
            password: packet.data[2].toString('ascii').replace(/\u0000/gi, ''),
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
