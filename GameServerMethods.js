// User define
let ServerPacket = require('./ServerPacket');

class GameServerMethods {
    static cryptInit(xorKey) {
        let packet = new ServerPacket(12);

        packet
            .writeC(0x00)
            .writeC(0x01)
            .writeC(xorKey[0])
            .writeC(xorKey[1])
            .writeC(xorKey[2])
            .writeC(xorKey[3])
            .writeC(xorKey[4])
            .writeC(xorKey[5])
            .writeC(xorKey[6])
            .writeC(xorKey[7]);

        return packet.buffer;
    }

    static charSelectInfo() {
        let packet = new ServerPacket(10);

        packet
            .writeC(0x1f)
            .writeD(0x00);

        return packet.buffer;
    }

    static charTemplates() {
        let packet = new ServerPacket(10);

        packet
            .writeC(0x23)
            .writeD(0x00);

        return packet.buffer;
    }
}

module.exports = GameServerMethods;
