let ServerPacket = invoke('ServerPacket');

function charSelectInfo(characters) {
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

module.exports = charSelectInfo;
