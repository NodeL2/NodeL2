const ServerPacket = invoke('Packet/Server');

function userInfo(actor) {
    const packet = new ServerPacket(0x04);

    packet
        .writeD(actor.model.locX)
        .writeD(actor.model.locY)
        .writeD(actor.model.locZ)
        .writeD(0x00)  // Heading
        .writeD(actor.model.id)
        .writeS(actor.model.name)
        .writeD(actor.model.race)
        .writeD(actor.model.sex)
        .writeD(actor.model.classId)
        .writeD(actor.model.level)
        .writeD(actor.model.exp)
        .writeD(actor.model.str)
        .writeD(actor.model.dex)
        .writeD(actor.model.con)
        .writeD(actor.model.int)
        .writeD(actor.model.wit)
        .writeD(actor.model.men)
        .writeD(actor.model.maxHp)
        .writeD(actor.model.hp)
        .writeD(actor.model.maxMp)
        .writeD(actor.model.mp)
        .writeD(actor.model.sp)
        .writeD(0x00)  // Current Load
        .writeD(actor.model.maxLoad)
        .writeD(0x28)  // ? 20 no weapon or 40 weapon ?

        // Object ID
        .writeD(0x00)  // Underwear
        .writeD(0x00)  // Ear right
        .writeD(0x00)  // Ear left
        .writeD(0x00)  // Neck
        .writeD(0x00)  // Finger right
        .writeD(0x00)  // Finger left
        .writeD(0x00)  // Head
        .writeD(0x00)  // Hand right
        .writeD(0x00)  // Hand left
        .writeD(0x00)  // Gloves
        .writeD(0x00)  // Chest
        .writeD(0x00)  // Legs
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
        .writeD(0x00)  // Hand right
        .writeD(0x00)  // Hand left
        .writeD(0x00)  // Gloves
        .writeD(0x00)  // Chest
        .writeD(0x00)  // Legs
        .writeD(0x00)  // Feet
        .writeD(0x00)  // Back
        .writeD(0x00)  // Hand left & right

        .writeD(actor.model.pAtk)
        .writeD(actor.model.atkSpd)
        .writeD(actor.model.pDef)
        .writeD(actor.model.evasion)
        .writeD(actor.model.accur)
        .writeD(actor.model.crit)
        .writeD(actor.model.mAtk)
        .writeD(actor.model.castSpd)
        .writeD(actor.model.speed)
        .writeD(actor.model.mDef)
        .writeD(0x00)  // Purple = 0x01
        .writeD(actor.model.karma)
        .writeD(actor.model.run)
        .writeD(actor.model.walk)
        .writeD(actor.model.swim)
        .writeD(actor.model.swim)
        .writeD(0x00)  // Floating Run Speed
        .writeD(0x00)  // Floating Walk Speed
        .writeD(0x00)  // Flying Run Speed
        .writeD(0x00)  // Flying Walk Speed
        .writeF(1.0)   // Movement Multiplier
        .writeF(actor.model.atkSpeed / 277.77777777777777)
        .writeF(actor.model.radius)
        .writeF(actor.model.size)
        .writeD(actor.model.hair)
        .writeD(actor.model.hairColor)
        .writeD(actor.model.face)
        .writeD(actor.model.isGM)
        .writeS(actor.model.title)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // Clan Crest ID
        .writeD(0x00)  // Ally ID
        .writeD(0x00)  // Ally Crest ID
        .writeD(0x00)  // ?
        .writeC(0x00)  // ?
        .writeC(0x00)  // Private Store Type
        .writeC(actor.model.crafter)
        .writeD(actor.model.pk)
        .writeD(actor.model.pvp)
        .writeH(0x00)  // Cubic Count
        .writeC(0x00)  // Find Party Members = 0x01
        .writeD(0x00)  // Is invisible?
        .writeC(0x00)  // ?
        .writeD(0x00)  // Clan Privileges
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeH(actor.model.recRemain)
        .writeH(actor.model.evalScore);

    return packet.fetchBuffer();
}

module.exports = userInfo;
