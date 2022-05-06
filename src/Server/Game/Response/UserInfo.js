let ServerPacket = invoke('Packet/Server');

function userInfo(actor) {
    let packet = new ServerPacket(0x04);

    packet
        .writeD(actor.model.x)
        .writeD(actor.model.y)
        .writeD(actor.model.z)
        .writeD(0x00)  // Heading
        .writeD(actor.model.id)
        .writeS(actor.model.name)
        .writeD(actor.model.raceId)
        .writeD(actor.model.gender)
        .writeD(actor.model.classId)
        .writeD(actor.model.level)
        .writeD(actor.model.exp)
        .writeD(actor.model.stats.str)
        .writeD(actor.model.stats.dex)
        .writeD(actor.model.stats.con)
        .writeD(actor.model.stats.int)
        .writeD(actor.model.stats.wit)
        .writeD(actor.model.stats.men)
        .writeD(actor.model.maxHp)
        .writeD(actor.model.hp)
        .writeD(actor.model.maxMp)
        .writeD(actor.model.mp)
        .writeD(actor.model.sp)
        .writeD(0x00)  // Load
        .writeD(actor.model.stats.weightLimit)
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

        .writeD(actor.model.stats.pAtk)
        .writeD(actor.model.stats.atkSpd)
        .writeD(actor.model.stats.pDef)
        .writeD(actor.model.stats.evasion)
        .writeD(actor.model.stats.accuracy)
        .writeD(actor.model.stats.critical)
        .writeD(actor.model.stats.mAtk)
        .writeD(actor.model.stats.castSpd)
        .writeD(actor.model.stats.speed)
        .writeD(actor.model.stats.mDef)
        .writeD(0x00)  // Purple = 0x01
        .writeD(actor.model.karma)
        .writeD(actor.model.speed.run)
        .writeD(actor.model.speed.walk)
        .writeD(actor.model.speed.swim)
        .writeD(actor.model.speed.swim)
        .writeD(0x00)  // Floating Run Speed
        .writeD(0x00)  // Floating Walk Speed
        .writeD(0x00)  // Flying Run Speed
        .writeD(0x00)  // Flying Walk Speed
        .writeF(1.0)   // Movement Multiplier
        .writeF(actor.model.stats.atkSpd / 277.77777777777777)  // Attack Speed Multiplier
        .writeF(actor.model.metrics.maleR)
        .writeF(actor.model.metrics.maleH)
        .writeD(actor.model.hairId)
        .writeD(actor.model.hairColor)
        .writeD(actor.model.face)
        .writeD(0x00)  // GM = 0x01
        .writeS(actor.model.title)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // Clan Crest ID
        .writeD(0x00)  // Ally ID
        .writeD(0x00)  // Ally Crest ID
        .writeD(0x00)  // ?
        .writeC(0x00)  // ?
        .writeC(0x00)  // Private Store Type
        .writeC(actor.model.canCraft)
        .writeD(0x00)  // PK Kills
        .writeD(0x00)  // PVP Kills
        .writeH(0x00)  // Cubic Count
        .writeC(0x00); // Find Party Members = 0x01

    return packet.fetchBuffer();
}

module.exports = userInfo;
