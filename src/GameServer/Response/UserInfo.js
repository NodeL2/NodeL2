let ServerPacket = invoke('ServerPacket');

function userInfo(player) {
    let packet = new ServerPacket(600);

    packet
        .writeC(0x04)
        .writeD(player.model.x)
        .writeD(player.model.y)
        .writeD(player.model.z)
        .writeD(0x00)  // Heading
        .writeD(player.id)
        .writeS(player.name)
        .writeD(player.raceId)
        .writeD(player.model.gender)
        .writeD(player.classId)
        .writeD(player.model.level)
        .writeD(player.model.exp)
        .writeD(player.model.str)
        .writeD(player.model.dex)
        .writeD(player.model.con)
        .writeD(player.model.int)
        .writeD(player.model.wit)
        .writeD(player.model.men)
        .writeD(player.model.maxHp)
        .writeD(player.model.hp)
        .writeD(player.model.maxMp)
        .writeD(player.model.mp)
        .writeD(player.model.sp)
        .writeD(0x00)  // Load
        .writeD(player.model.weightLimit)
        .writeD(0x28)  // ?

        // Object ID
        .writeD(0x00)  // Underwear
        .writeD(0x00)  // Ear right
        .writeD(0x00)  // Ear left
        .writeD(0x00)  // Neck
        .writeD(0x00)  // Finger right
        .writeD(0x00)  // Finger left
        .writeD(0x00)  // Head
        .writeD(player.paperdoll.raw[BodyPart.RIGHT_HAND].id)
        .writeD(0x00)  // Hand left
        .writeD(0x00)  // Gloves
        .writeD(player.paperdoll.raw[BodyPart.CHEST].id)
        .writeD(player.paperdoll.raw[BodyPart.LEGS].id)
        .writeD(0x00)  // Feet
        .writeD(0x00)  // Back
        .writeD(0x00)  // Hand left & right

        // Item ID
        .writeD(0x00)  // Underwear
        .writeD(0x00)  // Ear right
        .writeD(0x00)  // Ear left
        .writeD(0x00)  // Neck
        .writeD(0x00)  // Finger right
        .writeD(0x00)  // Finger left
        .writeD(0x00)  // Head
        .writeD(player.paperdoll.raw[BodyPart.RIGHT_HAND].itemId)
        .writeD(0x00)  // Hand left
        .writeD(0x00)  // Gloves
        .writeD(player.paperdoll.raw[BodyPart.CHEST].itemId)
        .writeD(player.paperdoll.raw[BodyPart.LEGS].itemId)
        .writeD(0x00)  // Feet
        .writeD(0x00)  // Back
        .writeD(0x00)  // Hand left & right

        .writeD(player.model.pAtk)
        .writeD(player.model.atkSpeed)
        .writeD(player.model.pDef)
        .writeD(player.model.evasion)
        .writeD(player.model.accuracy)
        .writeD(player.model.critical)
        .writeD(player.model.mAtk)
        .writeD(player.model.castingSpd)
        .writeD(player.model.speed)
        .writeD(player.model.mDef)
        .writeD(0x00)  // Purple = 0x01
        .writeD(player.model.karma)
        .writeD(player.model.groundSpdHigh)
        .writeD(player.model.groundSpdLow)
        .writeD(player.model.waterSpd)
        .writeD(player.model.waterSpd)
        .writeD(0x00)  // Floating Run Speed
        .writeD(0x00)  // Floating Walk Speed
        .writeD(0x00)  // Flying Run Speed
        .writeD(0x00)  // Flying Walk Speed
        .writeF(1.0)   // Movement Multiplier
        .writeF(player.model.atkSpeed / 277.77777777777777)   // Attack Speed Multiplier
        .writeF(player.model.collisionRadius)
        .writeF(player.model.collisionHeight)
        .writeD(player.model.hairStyle)
        .writeD(player.model.hairColor)
        .writeD(player.model.face)
        .writeD(0x00)  // GM = 0x01
        .writeS(player.title)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // Clan Crest ID
        .writeD(0x00)  // Ally ID
        .writeD(0x00)  // Ally Crest ID
        .writeD(0x00)  // ?
        .writeC(0x00)  // ?
        .writeC(0x00)  // Private Store Type
        .writeC(player.model.canCraft)
        .writeD(0x00)  // PK Kills
        .writeD(0x00)  // PVP Kills
        .writeH(0x00)  // Cubic Count
        .writeC(0x00); // Find Party Members = 0x01

    return packet.buffer;
}

module.exports = userInfo;
