let Database     = invoke('Database');
let ServerPacket = invoke('ServerPacket');

function charSelectInfo(characters) {
    let packet = new ServerPacket(characters ? characters.length * 296 : 8); // 5

    packet
        .writeC(0x1f);

    if (characters) {
        packet
            .writeD(characters.length);

        for (var character of characters) {
            Database.fetchClassInformation(character.classId).then((classInfo) => {
                character = {
                    ...character, ...classInfo
                };
            });

            packet
                .writeS(character.name)
                .writeD(character.id)
                .writeS(character.username)
                .writeD(0x55555555)
                .writeD(0x00)  // ?
                .writeD(0x00)  // ?
                .writeD(character.gender)
                .writeD(character.raceId)
                .writeD(character.classId)
                .writeD(0x01)  // ?
                .writeD(character.x)
                .writeD(character.y)
                .writeD(character.z)
                .writeF(character.hp)
                .writeF(character.mp)
                .writeD(character.sp)
                .writeD(character.exp)
                .writeD(character.level)
                .writeD(character.karma);

            for (let i = 0; i < 39; i++) {
                packet
                    .writeD(0x00);
            }

            packet
                .writeD(character.hairStyle)
                .writeD(character.hairColor)
                .writeD(character.face)
                .writeF(character.maxHp)
                .writeF(character.maxMp)
                .writeD(0x00);  // Days before deletion
        }
    }
    else {
        packet
            .writeD(0x00);
    }

    return packet.buffer;
}

module.exports = charSelectInfo;
