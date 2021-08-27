let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function npcInfo(npc) {
    let packet = new ChroniclePacket(npcInfo.name);

    packet
        .writeD(npc.id) // ObjectId
        .writeD(npc.npcId) // Id
        .writeD(npc.attackable) // Attackable = 0x01
        .writeD(npc.x) // x
        .writeD(npc.y) // y
        .writeD(npc.z) // z
        .writeD(npc.heading) // Heading
        .writeD(0x00)
        .writeD(0x00) // Magical Speed
        .writeD(0x00) // Physical Speed
        .writeD(80) // Run Speed
        .writeD(50) // Walk Speed
        .writeD(50)	// Swim Speed
        .writeD(50)	// Swim Speed
        .writeD(100) // Floating Run Speed
        .writeD(100) // Floating Walk Speed
        .writeD(100) // Flying Run Speed
        .writeD(100) // Flying Walk Speed
        .writeF(1) // Movement Multiplier
        .writeF(1) // Attack Speed Multiplier
        .writeF(npc.collisionRadius) // Collision Radius
        .writeF(npc.collisionHeight) // Collision Height
        .writeD(0x00) // Right Hand Item
        .writeD(0x00)
        .writeD(0x00) // Left Hand Item
        .writeC(0x01) // Name Above Character = 0x01
        .writeC(0x00) // Walking = 0x00
        .writeC(0x00) // Attacking = 0x01
        .writeC(0x00) // Dead = 0x01
        .writeC(0x00) // Invisible = 0x01
        .writeS(npc.name) // Name
        .writeS('') // Title
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = npcInfo;
