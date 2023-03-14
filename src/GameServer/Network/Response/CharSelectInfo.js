const SendPacket = invoke('Packet/Send');

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

        for (let i = 0; i < 16; i++) {
            packet
                .writeD(character.paperdoll[i].id);
        }

        for (let i = 0; i < 16; i++) {
            packet
                .writeD(character.paperdoll[i].selfId);
        }

        packet
            .writeD(character.hair)
            .writeD(character.hairColor)
            .writeD(character.face)
            .writeF(character.maxHp)
            .writeF(character.maxMp)
            .writeD(0x00)  // Time before deletion
            .writeD(0x00)  // Class Id?
            .writeD(0x00)  // Active character slot?
            .writeC(0x00); // Enchanted effect
    }

    return packet.fetchBuffer();
}

module.exports = charSelectInfo;
