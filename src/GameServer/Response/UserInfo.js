let Database = invoke('Database');
let ServerPacket = invoke('ServerPacket');

function userInfo(player) {
    let packet = new ServerPacket(600);

    packet
        .writeC(0x04)
        .writeD(player.x)
        .writeD(player.y)
        .writeD(player.z)
        .writeD(0x00)  // Heading
        .writeD(player.id)
        .writeS(player.name)
        .writeD(player.raceId)
        .writeD(player.gender)
        .writeD(player.classId)
        .writeD(player.level)
        .writeD(player.exp)
        .writeD(player.str)
        .writeD(player.dex)
        .writeD(player.con)
        .writeD(player.int)
        .writeD(player.wit)
        .writeD(player.men)
        .writeD(player.maxHp)
        .writeD(player.hp)
        .writeD(player.maxMp)
        .writeD(player.mp)
        .writeD(player.sp)
        .writeD(0x00)  // Load
        .writeD(player.weightLimit)
        .writeD(0x28)  // ?

        // Object ID
        .writeD(0x00)  // Underwear
        .writeD(0x00)  // Ear right
        .writeD(0x00)  // Ear left
        .writeD(0x00)  // Neck
        .writeD(0x00)  // Finger right
        .writeD(0x00)  // Finger left
        .writeD(0x00)  // Head
        .writeD(268435572)  // Hand right
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
        .writeD(2369)  // Hand right
        .writeD(0x00)  // Hand left
        .writeD(0x00)  // Gloves
        .writeD(0x00)  // Chest
        .writeD(0x00)  // Legs
        .writeD(0x00)  // Feet
        .writeD(0x00)  // Back
        .writeD(0x00)  // Hand left & right

        .writeD(player.pAtk)
        .writeD(player.atkSpeed)
        .writeD(player.pDef)
        .writeD(player.evasion)
        .writeD(player.accuracy)
        .writeD(player.critical)
        .writeD(player.mAtk)
        .writeD(player.castingSpd)
        .writeD(player.speed)
        .writeD(player.mDef)
        .writeD(0x00)  // Purple = 0x01
        .writeD(player.karma)
        .writeD(player.groundSpdHigh)
        .writeD(player.groundSpdLow)
        .writeD(player.waterSpd)
        .writeD(player.waterSpd)
        .writeD(0x00)  // Floating Run Speed
        .writeD(0x00)  // Floating Walk Speed
        .writeD(0x00)  // Flying Run Speed
        .writeD(0x00)  // Flying Walk Speed
        .writeF(1.1)   // Movement Multiplier
        .writeF(1.188) // Attack Speed Multiplier
        .writeF(player.collisionRadius)
        .writeF(player.collisionHeight)
        .writeD(player.hairStyle)
        .writeD(player.hairColor)
        .writeD(player.face)
        .writeD(0x00)  // GM = 0x01
        .writeS(player.title)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // Clan Crest ID
        .writeD(0x00)  // Ally ID
        .writeD(0x00)  // Ally Crest ID
        .writeD(0x00)  // ?
        .writeC(0x00)  // ?
        .writeC(0x00)  // Private Store Type
        .writeC(player.canCraft)
        .writeD(0x00)  // PK Kills
        .writeD(0x00)  // PVP Kills
        .writeH(0x00)  // Cubic Count
        .writeC(0x00); // Find Party Members = 0x01

    return packet.buffer;
}

module.exports = userInfo;
