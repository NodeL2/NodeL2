// User define
let ServerPacket = require('./ServerPacket');

class GameServerMethods {
    static CryptInit() {
        let packet = new ServerPacket(12);

        packet
            .writeC(0x00)
            .writeC(0x01)
            .writeD(0x00)
            .writeD(0x00);

        return packet.buffer;
    }
}

module.exports = GameServerMethods;
