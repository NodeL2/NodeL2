let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function userInfo(player) {
    let packet = new ChroniclePacket(userInfo.name);

    packet
        .writeD(player.model.x)
        .writeD(player.model.y)
        .writeD(player.model.z)
        .writeD(0x00)  // Heading
        .writeD(player.model.id)
        .writeS(player.model.name)
        .writeD(player.model.raceId)
        .writeD(player.model.gender)
        .writeD(player.model.classId)
        .writeD(player.model.level)
        .writeD(player.model.exp)
        .writeD(player.model.stats.str)
        .writeD(player.model.stats.dex)
        .writeD(player.model.stats.con)
        .writeD(player.model.stats.int)
        .writeD(player.model.stats.wit)
        .writeD(player.model.stats.men)
        .writeD(player.model.maxHp)
        .writeD(player.model.hp)
        .writeD(player.model.maxMp)
        .writeD(player.model.mp)
        .writeD(player.model.sp)
        .writeD(0x00)  // Load
        .writeD(player.model.stats.weightLimit)
        .writeD(0x28)  // ?

        // Object ID
        .writeD(0x00)  // Underwear
        .writeD(0x00)  // Ear right
        .writeD(0x00)  // Ear left
        .writeD(0x00)  // Neck
        .writeD(0x00)  // Finger right
        .writeD(0x00)  // Finger left
        .writeD(0x00)  // Head
        .writeD(0x00)
        .writeD(0x00)  // Hand left
        .writeD(0x00)  // Gloves
        .writeD(0x00)
        .writeD(0x00)
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
        .writeD(0x00)
        .writeD(0x00)  // Hand left
        .writeD(0x00)  // Gloves
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x00)  // Feet
        .writeD(0x00)  // Back
        .writeD(0x00)  // Hand left & right

        .writeD(player.model.stats.pAtk)
        .writeD(player.model.stats.atkSpd)
        .writeD(player.model.stats.pDef)
        .writeD(player.model.stats.evasion)
        .writeD(player.model.stats.accuracy)
        .writeD(player.model.stats.critical)
        .writeD(player.model.stats.mAtk)
        .writeD(player.model.stats.castSpd)
        .writeD(player.model.stats.speed)
        .writeD(player.model.stats.mDef)
        .writeD(0x00)  // Purple = 0x01
        .writeD(player.model.karma)
        .writeD(player.model.speed.run)
        .writeD(player.model.speed.walk)
        .writeD(player.model.speed.swim)
        .writeD(player.model.speed.swim)
        .writeD(0x00)  // Floating Run Speed
        .writeD(0x00)  // Floating Walk Speed
        .writeD(0x00)  // Flying Run Speed
        .writeD(0x00)  // Flying Walk Speed
        .writeF(1.0)   // Movement Multiplier
        .writeF(player.model.stats.atkSpd / 277.77777777777777)  // Attack Speed Multiplier
        .writeF(player.model.metrics.maleR)
        .writeF(player.model.metrics.maleH)
        .writeD(player.model.hairStyle)
        .writeD(player.model.hairColor)
        .writeD(player.model.face)
        .writeD(0x00)  // GM = 0x01
        .writeS(player.model.title)
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

    return packet.fetchBuffer();
}

module.exports = userInfo;
