const ServerPacket = invoke('Packet/Server');

function npcInfo(npc) {
    const packet = new ServerPacket(0x0c);

    packet
        .writeD(npc.id)
        .writeC(0x01)  // Spawn Animation 0: Teleported 1: Default 2: Summoned
        .writeH(37)    // Sections?
        .writeB([0, 12, 12, 0, 0])

        .writeC(8 + Utils.textSize(npc.title))
        .writeC(0x00)  // Attackable
        .writeD(0x00)  // Relation
        .writeT(npc.title)

        .writeH(145 + Utils.textSize(npc.name))
        .writeD(npc.id + 1000000)
        .writeD(npc.loc.x)
        .writeD(npc.loc.y)
        .writeD(npc.loc.z)
        .writeD(npc.loc.heading)
        .writeD(0x00)  // ?
        .writeD(0x00)  // pAtkSpd
        .writeD(0x00)  // mAtkSpd
        .writeE(0.0)   // runSpdMul
        .writeE(0.0)   // atkSpdMul
        .writeD(0x00)  // R. Hand
        .writeD(0x00)  // Armor Id
        .writeD(0x00)  // L. Hand
        .writeC(0x00)  // Alive
        .writeC(0x00)  // Running
        .writeC(0x00)  // In Water
        .writeC(0x00)  // Team Ordinal
        .writeD(0x00)  // Enchant Effect
        .writeD(0x00)  // Flying
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // State
        .writeD(0x00)  // Transform Id
        .writeD(0x00)  // HP
        .writeD(0x00)  // MP
        .writeD(0x00)  // Max HP
        .writeD(0x00)  // Max MP
        .writeC(0x00)  // 2: Animation on spawn
        .writeD(0x00)
        .writeD(0x00)
        .writeT(npc.name)
        .writeD(0x00)  // NPC Name Id
        .writeD(0x00)  // NPC Title Id
        .writeC(0x00)  // PVP Flag
        .writeD(0x00)  // Name color
        .writeD(0x00)  // Clan Id
        .writeD(0x00)  // Clan Crest Id
        .writeD(0x00)  // Large Clan Crest Id
        .writeD(0x00)  // Ally Id
        .writeD(0x00)  // Ally Crest Id
        .writeC(0x00)  // Status Mask
        .writeH(0x00); // Abnormal Effects Size

    return packet.fetchBuffer();
}

module.exports = npcInfo;
