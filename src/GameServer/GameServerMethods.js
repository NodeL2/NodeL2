// User define
let ServerPacket = require(__basedir + '/src/ServerPacket');

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
                    .writeD(characters[i].x) // No effect?
                    .writeD(characters[i].y) // No effect?
                    .writeD(characters[i].z) // No effect?
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

    static characterSelected(character) {
        let packet = new ServerPacket(230 + ServerPacket.strlen(character.name) + ServerPacket.strlen(character.title));

        packet
            .writeC(0x21)
            .writeS(character.name)
            .writeD(character.objectId)
            .writeS(character.title)
            .writeD(0x55555555)
            .writeD(character.clanId)
            .writeD(0x00)
            .writeD(character.gender)
            .writeD(character.raceId)
            .writeD(character.classId)
            .writeD(0x01)
            .writeD(character.x)
            .writeD(character.y)
            .writeD(character.z)
            .writeF(character.hp)
            .writeF(character.mp)
            .writeD(character.sp)
            .writeD(character.exp)
            .writeD(character.level)
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x00);

        for (let i = 0; i < 30; i++) {
            packet
                .writeD(0x00);
        }

        packet
            .writeD(0x00); // In-game time

        return packet.buffer;
    }

    static charTemplates() {
        let packet = new ServerPacket(10);

        packet
            .writeC(0x23)
            .writeD(0x00);

        return packet.buffer;
    }

    static questList() {
        let packet = new ServerPacket(5);

        packet
            .writeC(0x98)
            .writeH(0x00)
            .writeH(0x00);

        return packet.buffer;
    }

    static userInfo(character) {
        let packet = new ServerPacket(600);

        packet
            .writeC(0x04)
            .writeD(character.x)
            .writeD(character.y)
            .writeD(character.z)
            .writeD(0x00) // getHeading
            .writeD(character.id) // getObjectId
            .writeS(character.name)
            .writeD(character.raceId)
            .writeD(character.gender)
            .writeD(character.classId)
            .writeD(character.level)
            .writeD(character.exp)
            .writeD(0x01) // STR
            .writeD(0x01) // DEX
            .writeD(0x01) // CON
            .writeD(0x01) // INT
            .writeD(0x01) // WIT
            .writeD(0x01) // MEN
            .writeD(character.maximumHp)
            .writeD(character.hp)
            .writeD(character.maximumMp)
            .writeD(character.mp)
            .writeD(character.sp)
            .writeD(0x01) // getLoad
            .writeD(81900) // getMaximumLoad
            .writeD(0x28)
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
            .writeD(0x01) // P. Attk
            .writeD(0x01) // Speed
            .writeD(0x01) // P. Def
            .writeD(0x01) // Evasion
            .writeD(0x01) // Accuracy
            .writeD(0x01) // Critical
            .writeD(0x01) // M. Attk
            .writeD(0x01) // M. Speed
            .writeD(0x01) // Speed
            .writeD(0x01) // M. Def
            .writeD(0x00) // pvp flag 0 - non pvp, 0x 1 - pvp = violett name
            .writeD(0x00) // Karma
            .writeD(115) // getRunSpeed
            .writeD(80) // getWalkSpeed
            .writeD(0x32) // swimspeed
            .writeD(0x32) // swimspeed
            .writeD(115) // getFloatingRunSpeed
            .writeD(115) // getFloatingWalkSpeed
            .writeD(115) // getFlyingRunSpeed
            .writeD(115) // getFlyingWalkSpeed
            .writeF(1.1) // getMovementMultiplier
            .writeF(1.188) // getAttackSpeedMultiplier
            .writeF(9) // getCollisionRadius
            .writeF(23) // getCollisionHeight
            .writeD(character.hairStyle)
            .writeD(character.hairColor)
            .writeD(character.face)
            .writeD(0x00) // if GM - 0x01
            .writeS('') // getTitle
            .writeD(character.clanId) // pledge id
            .writeD(character.clanId) // pledge crest id
            .writeD(0x00) // getAllyId - ally id
            .writeD(0x00) // ally crest id
            .writeD(0x00) // 0x60 ???
            .writeC(0x00)
            .writeC(0x00) // getPrivateStoreType
            .writeC(0x00) // Can craft
            .writeD(0x00) // getPkKills
            .writeD(0x00) // getPvpKills
            .writeH(0x00) // cubic count
            .writeC(0x00); //1-find party members

        return packet.buffer;
    }
}

module.exports = GameServerMethods;
