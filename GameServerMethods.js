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

    static charSelectInfo(characters) {
        let packet = new ServerPacket(characters ? characters.length * 400 : 10);

        packet
            .writeC(0x1f);

        if (characters) {
            packet
                .writeD(characters.length);
                
            for (let i = 0; i < characters.length; i++) {
                packet
                    .writeS(characters[i].name)
                    .writeD(characters[i].id)
                    .writeS(characters[i].accountId)
                    .writeD(0x55555555)
                    .writeD(characters[i].clanId)
                    .writeD(0x00)
                    .writeD(characters[i].gender)
                    .writeD(characters[i].raceId)
                    .writeD(characters[i].classId)
                    .writeD(0x01)
                    .writeD(characters[i].x) // No effect ?
                    .writeD(characters[i].y) // No effect ?
                    .writeD(characters[i].z) // No effect ?
                    .writeF(characters[i].hp)
                    .writeF(characters[i].mp)
                    .writeD(characters[i].sp)
                    .writeD(characters[i].exp)
                    .writeD(characters[i].level)
                    .writeD(characters[i].karma)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(0x00)
                    .writeD(characters[i].hairStyle)
                    .writeD(characters[i].hairColor)
                    .writeD(characters[i].face)
                    .writeF(characters[i].maximumHp)
                    .writeF(characters[i].maximumMp)
                    .writeD(0x00);
            }
        }
        else {
            packet
                .writeD(0x00);
        }

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
