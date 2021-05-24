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
}

module.exports = GameClientMethods;
