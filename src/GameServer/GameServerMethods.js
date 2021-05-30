// User define
let ServerPacket = invoke('ServerPacket');

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

    static logoutOk() {
        let packet = new ServerPacket(1);

        packet
            .writeC(0x96);

        return packet.buffer;
    }

    static charSelectInfo(characters) {
        let packet = new ServerPacket(characters ? characters.length * 400 : 10);

        packet
            .writeC(0x1f);

        if (characters) {
            packet
                .writeD(characters.length);

            for (let character of characters) {
                packet
                    .writeS(character.name)
                    .writeD(character.id)
                    .writeS(character.username)
                    .writeD(0x55555555)
                    .writeD(0x00)  // ?
                    .writeD(0x00)  // ?
                    .writeD(character.gender)
                    .writeD(character.race_id)
                    .writeD(character.class_id)
                    .writeD(0x01)  // ?
                    .writeD(character.x)
                    .writeD(character.y)
                    .writeD(character.z)
                    .writeF(character.hp)
                    .writeF(character.mp)
                    .writeD(character.sp)
                    .writeD(character.exp)
                    .writeD(character.level)
                    .writeD(character.karma)
                    .writeD(0x00)  // ?
                    .writeD(0x00)  // ?
                    .writeD(0x00)  // ?
                    .writeD(0x00)  // ?
                    .writeD(0x00)  // ?
                    .writeD(0x00)  // ?
                    .writeD(0x00)  // ?
                    .writeD(0x00); // ?

                for (let i = 0; i < 31; i++) {
                    packet
                        .writeD(0x00);
                }

                packet
                    .writeD(character.hair_style)
                    .writeD(character.hair_color)
                    .writeD(character.face)
                    .writeF(character.max_hp)
                    .writeF(character.max_mp)
                    .writeD(0x00); // Days before deletion
            }
        }
        else {
            packet
                .writeD(0x00);
        }

        return packet.buffer;
    }

    static characterSelected(player) {
        let packet = new ServerPacket(
            230 + ServerPacket.strlen(player.name) + ServerPacket.strlen(player.title)
        );

        packet
            .writeC(0x21)
            .writeS(player.name)
            .writeD(player.id)
            .writeS(player.title)
            .writeD(0x55555555)
            .writeD(0x00)  // Clan ID
            .writeD(0x00)  // ?
            .writeD(player.gender)
            .writeD(player.raceId)
            .writeD(player.classId)
            .writeD(0x01)  // ?
            .writeD(player.x)
            .writeD(player.y)
            .writeD(player.z)
            .writeF(player.hp)
            .writeF(player.mp)
            .writeD(player.sp)
            .writeD(player.exp)
            .writeD(player.level)
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // Property: INT
            .writeD(0x00)  // Property: STR
            .writeD(0x00)  // Property: CON
            .writeD(0x00)  // Property: MEN
            .writeD(0x00)  // Property: DEX
            .writeD(0x00); // Property: WIT

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

    static characterCreateSuccess() {
        let packet = new ServerPacket(5);

        packet
            .writeC(0x25)
            .writeD(0x01);

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

    static userInfo(player) {
        let packet = new ServerPacket(600);

        packet
            .writeC(0x04)
            .writeD(player.x)
            .writeD(player.y)
            .writeD(player.z)
            .writeD(0x00)  // Heading
            .writeD(player.id)
            .writeS(player.name)
            .writeD(player.raceId)
            .writeD(player.gender)
            .writeD(player.classId)
            .writeD(player.level)
            .writeD(player.exp)
            .writeD(0x01)  // Property: STR
            .writeD(0x01)  // Property: DEX
            .writeD(0x01)  // Property: CON
            .writeD(0x01)  // Property: INT
            .writeD(0x01)  // Property: WIT
            .writeD(0x01)  // Property: MEN
            .writeD(player.maxHp)
            .writeD(player.hp)
            .writeD(player.maxMp)
            .writeD(player.mp)
            .writeD(player.sp)
            .writeD(0x01)  // Load
            .writeD(81900) // Maximum Load
            .writeD(0x28)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x01)  // Physical Attack
            .writeD(0x01)  // Speed
            .writeD(0x01)  // Physical Defense
            .writeD(0x01)  // Evasion
            .writeD(0x01)  // Accuracy
            .writeD(0x01)  // Critical
            .writeD(0x01)  // Magic Attack
            .writeD(0x01)  // Magic Speed
            .writeD(0x01)  // Speed
            .writeD(0x01)  // Magic Defense
            .writeD(0x00)  // Purple = 0x01
            .writeD(player.karma)
            .writeD(215)   // Run Speed
            .writeD(280)   // Walk Speed
            .writeD(0x32)  // Swim Speed
            .writeD(0x32)  // Swim Speed
            .writeD(115)   // Floating Run Speed
            .writeD(115)   // Floating Walk Speed
            .writeD(115)   // Flying Run Speed
            .writeD(115)   // Flying Walk Speed
            .writeF(1.1)   // Movement Multiplier
            .writeF(1.188) // Attack Speed Multiplier
            .writeF(9)     // Collision Radius
            .writeF(23)    // Collision Height
            .writeD(player.hairStyle)
            .writeD(player.hairColor)
            .writeD(player.face)
            .writeD(0x00)  // GM = 0x01
            .writeS(player.title)
            .writeD(0x00)  // Clan ID
            .writeD(0x00)  // Clan Crest ID
            .writeD(0x00)  // Ally ID
            .writeD(0x00)  // Ally Crest ID
            .writeD(0x00)  // ?
            .writeC(0x00)  // ?
            .writeC(0x00)  // Private Store Type
            .writeC(0x00)  // Can Craft
            .writeD(0x00)  // PK Kills
            .writeD(0x00)  // PVP Kills
            .writeH(0x00)  // Cubic Count
            .writeC(0x00); // Find Party Members = 0x01

        return packet.buffer;
    }

    static moveToLocation(id, coords) {
        let packet = new ServerPacket(29);

        packet
            .writeC(0x01)
            .writeD(id)
            .writeD(coords.target.x)
            .writeD(coords.target.y)
            .writeD(coords.target.z)
            .writeD(coords.origin.x)
            .writeD(coords.origin.y)
            .writeD(coords.origin.z);

        return packet.buffer;
    }
}

module.exports = GameServerMethods;
