let ServerPacket = invoke('ServerPacket');

function npcInfo() {
    let packet = new ServerPacket(600);

    packet
        .writeC(0x22)
        .writeD(432) // ObjectId
        .writeD(1000000 + 432) // Id
        .writeD(0x00)
        .writeD(43648) // x
        .writeD(40352) // y
        .writeD(-3430) // z
        .writeD(0x00) // getHeading
        .writeD(0x00)
        .writeD(0x00) // getMagicalSpeed
        .writeD(0x00) // getPhysicalSpeed
        .writeD(80) // getRunSpeed
        .writeD(50) // getWalkSpeed
        .writeD(50)	// swimspeed
        .writeD(50)	// swimspeed
        .writeD(100) // getFloatingRunSpeed
        .writeD(100) // getFloatingWalkSpeed
        .writeD(100) // getFlyingRunSpeed
        .writeD(100) // getFlyingWalkSpeed
        .writeF(1) // getMovementMultiplier
        .writeF(1) // getAttackSpeedMultiplier
        .writeF(5.0) // getCollisionRadius
        .writeF(4.5) // getCollisionHeight
        .writeD(0x00) // getRightHandItem
        .writeD(0)
        .writeD(0x00) // getLeftHandItem
        .writeC(1) // name above char 1=true ... ??
        .writeC(0) // walking=0 
        .writeC(0) // attacking 1=true
        .writeC(0) // dead 1=true
        .writeC(0) // invisible ?? 0=false  1=true   2=summoned (only works if model has a summon animation)
        .writeS('Elpy') // Name
        .writeS('') // Title
        .writeD(0)
        .writeD(0)
        .writeD(0);

    return packet.buffer;
}

module.exports = npcInfo;
