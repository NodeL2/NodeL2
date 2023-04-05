const SendPacket = invoke('Packet/Send');

function charInfo(actor) {
    const packet = new SendPacket(0x03);

    packet
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocY())
        .writeD(actor.fetchLocZ())
        .writeD(actor.fetchHead())
        .writeD(actor.fetchId())
        .writeS(actor.fetchName())
        .writeD(actor.fetchRace())
        .writeD(actor.fetchSex())
        .writeD(actor.fetchClassId())
        .writeD(0x00)  // ?
        .writeD(actor.backpack.fetchPaperdollSelfId( 6)) // Head
        .writeD(actor.backpack.fetchPaperdollSelfId( 7)) // Weapon
        .writeD(actor.backpack.fetchPaperdollSelfId( 8)) // Shield
        .writeD(actor.backpack.fetchPaperdollSelfId( 9)) // Hands
        .writeD(actor.backpack.fetchPaperdollSelfId(10)) // Chest
        .writeD(actor.backpack.fetchPaperdollSelfId(11)) // Pants
        .writeD(actor.backpack.fetchPaperdollSelfId(12)) // Feet
        .writeD(0x00)  // Back
        .writeD(actor.backpack.fetchPaperdollSelfId(14)) // Dual weapon
        .writeD(0x00)  // Hair
        .writeD(0x00)  // ?
        .writeD(actor.fetchCollectiveCastSpd())
        .writeD(actor.fetchCollectiveAtkSpd())
        .writeD(0x00)  // Purple = 0x01
        .writeD(actor.fetchKarma())
        .writeD(actor.fetchCollectiveRunSpd())
        .writeD(actor.fetchCollectiveWalkSpd())
        .writeD(actor.fetchSwim())
        .writeD(actor.fetchSwim())
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeF(1.0)   // Move multiplier
        .writeF(actor.fetchAtkSpdMultiplier())
        .writeF(actor.fetchRadius())
        .writeF(actor.fetchSize())
        .writeD(actor.fetchHair())
        .writeD(actor.fetchHairColor())
        .writeD(actor.fetchFace())
        .writeS(actor.fetchTitle())
        .writeD(0x00)  // Clan Id
        .writeD(0x00)  // Clan Crest Id
        .writeD(0x00)  // Ally Id
        .writeD(0x00)  // Ally Crest Id
        .writeD(0x00)  // ?
        .writeC(0x01)  // Standing = 1
        .writeC(0x01)  // Running = 1
        .writeC(0x00)  // Combat = 1
        .writeC(0x00)  // Dead = 1
        .writeC(0x00)  // Invisible = 1
        .writeC(0x00)  // Mount
        .writeC(0x00)  // Sells
        .writeH(0x00)  // Cubic count
        .writeC(0x00)  // Party matching
        .writeD(0x00)  // Abnormal effect
        .writeC(0x00)  // Recommendations left
        .writeH(0x00); // Recommendations won

    return packet.fetchBuffer();
}

module.exports = charInfo;
