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
        .writeD(0x01)  // Load
        .writeD(81900) // Maximum Load
        .writeD(0x28)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x01)  // Physical Attack
        .writeD(0x01)  // Speed
        .writeD(0x01)  // Physical Defense
        .writeD(0x01)  // Evasion
        .writeD(0x01)  // Accuracy
        .writeD(0x01)  // Critical
        .writeD(0x01)  // Magic Attack
        .writeD(0x01)  // Magic Speed
        .writeD(0x01)  // Speed
        .writeD(0x01)  // Magic Defense
        .writeD(0x00)  // Purple = 0x01
        .writeD(player.karma)
        .writeD(215)   // Run Speed
        .writeD(125)   // Walk Speed
        .writeD(0x32)  // Swim Speed
        .writeD(0x32)  // Swim Speed
        .writeD(115)   // Floating Run Speed
        .writeD(115)   // Floating Walk Speed
        .writeD(115)   // Flying Run Speed
        .writeD(115)   // Flying Walk Speed
        .writeF(1.1)   // Movement Multiplier
        .writeF(1.188) // Attack Speed Multiplier
        .writeF(9)     // Collision Radius
        .writeF(23)    // Collision Height
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
        .writeC(0x00)  // Can Craft
        .writeD(0x00)  // PK Kills
        .writeD(0x00)  // PVP Kills
        .writeH(0x00)  // Cubic Count
        .writeC(0x00); // Find Party Members = 0x01

    return packet.buffer;
}

module.exports = userInfo;
