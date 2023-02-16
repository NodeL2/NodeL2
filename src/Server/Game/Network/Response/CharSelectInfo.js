const SendPacket = invoke('Server/Packet/Send');

function charSelectInfo(characters) {
    const packet = new SendPacket(0x13);

    packet
        .writeD(characters.length);

    for (const character of characters) {
        packet
            .writeS(character.name)
            .writeD(character.id)
            .writeS(character.username)
            .writeD(0x55555555)
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(character.sex)
            .writeD(character.race)
            .writeD(character.classId)
            .writeD(0x01)  // ?
            .writeD(character.locX)
            .writeD(character.locY)
            .writeD(character.locZ)
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
            .writeD(0x00)  // ?
            .writeD(0x00); // ?

        console.info(characters.paperdoll);

        packet
            .writeD(0x00)  // ?
            .writeD(0x00)  // R-EAR
            .writeD(0x00)  // L-EAR
            .writeD(0x00)  // NECK
            .writeD(0x00)  // R-FINGER
            .writeD(0x00)  // L-FINGER
            .writeD(0x00)  // HEAD
            .writeD(0x00)  // R-HAND
            .writeD(0x00)  // L-HAND
            .writeD(0x00)  // GLOVES
            .writeD(0x00)  // CHEST
            .writeD(0x00)  // LEGS
            .writeD(0x00)  // FEET
            .writeD(0x00)  // BACK
            .writeD(0x00)  // LR-HAND

            .writeD(0x00)  // ?
            .writeD(0x00)  // R-EAR
            .writeD(0x00)  // L-EAR
            .writeD(0x00)  // NECK
            .writeD(0x00)  // R-FINGER
            .writeD(0x00)  // L-FINGER
            .writeD(0x00)  // HEAD
            .writeD(0x00)  // R-HAND
            .writeD(0x00)  // L-HAND
            .writeD(0x00)  // GLOVES
            .writeD(0x00)  // CHEST
            .writeD(0x00)  // LEGS
            .writeD(0x00)  // FEET
            .writeD(0x00)  // BACK
            .writeD(0x00); // LR-HAND

        packet
            .writeD(character.hair)
            .writeD(character.hairColor)
            .writeD(character.face)
            .writeF(character.maxHp)
            .writeF(character.maxMp)
            .writeD(0x00); // Time before deletion
    }

    return packet.fetchBuffer();
}

module.exports = charSelectInfo;
