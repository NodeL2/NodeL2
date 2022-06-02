const ServerPacket = invoke('Packet/Server');

function charSelectInfo(characters) {
    const packet = new ServerPacket(0x09);

    packet
        .writeD(characters.length)
        .writeD(0x07)  // Maximum characters per account
        .writeC(0x00)  // 1: Forbids creation
        .writeC(0x02)  // 2: Allowed to free play
        .writeD(0x02)  // 2: EU client
        .writeC(0x00); // 1: Premium account

    for (const character of characters) {
        packet
            .writeS(character.name)
            .writeD(character.id)
            .writeS(character.username)
            .writeD(0x55555555)
            .writeD(0x00)  // Clan Id
            .writeD(0x00)  // Builder level
            .writeD(character.sex)
            .writeD(character.race)
            .writeD(character.classId)
            .writeD(0x01)  // Game server name
            .writeD(character.locX)
            .writeD(character.locY)
            .writeD(character.locZ)
            .writeF(character.hp)
            .writeF(character.mp)
            .writeD(character.sp)
            .writeD(0x00)  // TODO: This is a hack, needs `writeQ`
            .writeD(character.exp)
            .writeD(0x00)  // TODO: This is a hack, needs `writeQ`
            .writeF(0.0)   // Exp. percent
            .writeD(character.level)
            .writeD(character.reputation)
            .writeD(character.pk)
            .writeD(character.pvp);

        for (let i = 0; i <  9; i++) { // ?
            packet
                .writeD(0x00);
        }

        for (let i = 0; i < 33; i++) { // Paperdoll
            packet
                .writeD(0x00);
        }

        for (let i = 0; i <  9; i++) { // ?
            packet
                .writeD(0x00);
        }

        packet
            .writeH(0x00)
            .writeH(0x00)
            .writeH(0x00)
            .writeH(0x00)
            .writeH(0x01)
            .writeD(character.hair)
            .writeD(character.hairColor)
            .writeD(character.face)
            .writeF(character.maxHp)
            .writeF(character.maxMp)
            .writeD(0x00)  // Days before deletion
            .writeD(0x00)  // Class Id?
            .writeD(0x00)  // Character active?
            .writeC(0x00)  // Enchanted effect?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // Pet NpcId
            .writeD(0x00)  // Pet level
            .writeD(0x00)  // Pet Food
            .writeD(0x00)  // Pet Food Level
            .writeF(0.0)   // Current pet HP
            .writeF(0.0)   // Current pet MP
            .writeD(0x00)  // Vitality
            .writeD(0x00)  // Vitality Percent
            .writeD(0x00)  // Remaining vitality item uses
            .writeD(0x01)  // Character active?
            .writeC(character.isNoble)
            .writeC(character.isHero)
            .writeC(0x00); // Show Hair Accessory
    }

    return packet.fetchBuffer();
}

module.exports = charSelectInfo;
