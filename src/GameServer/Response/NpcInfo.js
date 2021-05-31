let ServerPacket = invoke('ServerPacket');

function npcInfo() {
    let packet = new ServerPacket(600);

    packet
        .writeC(0x22)
        .writeD(432) // ObjectId
        .writeD(1000000 + 432) // Id
        .writeD(0x00)
        .writeD(43157) // x
        .writeD(41961) // y
        .writeD(-3492) // z
        .writeD(0x00) // Heading
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
        .writeF(5.0) // Collision Radius
        .writeF(4.5) // Collision Height
        .writeD(0x00) // Right Hand Item
        .writeD(0)
        .writeD(0x00) // Left Hand Item
        .writeC(0x01) // Name Above Character = 0x01
        .writeC(0x00) // Walking = 0x00
        .writeC(0x00) // Attacking = 0x01
        .writeC(0x00) // Dead = 0x01
        .writeC(0x00) // Invisible = 0x01
        .writeS('Elpy') // Name
        .writeS('') // Title
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x00);

    return packet.buffer;
}

module.exports = npcInfo;
