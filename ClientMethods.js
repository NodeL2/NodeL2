let ClientPacket = require('./ClientPacket.js');

class ClientMethods {
    static authorizeLogin(buffer) {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readB(14)  // Username
            .readB(16); // Password

        return {
            username: packet.data[1].toString('ascii').replace(/\u0000/gi, ''),
            password: packet.data[2].toString('ascii').replace(/\u0000/gi, ''),
        };
    }
}

module.exports = ClientMethods;
