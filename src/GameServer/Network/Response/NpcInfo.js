const SendPacket = invoke('Packet/Send');

function npcInfo(npc) {
    const packet = new SendPacket(0x16);

    packet
        .writeD(npc.fetchId())
        .writeD(npc.fetchSelfId() + 1000000)
        .writeD(npc.fetchAttackable())
        .writeD(npc.fetchLocX())
        .writeD(npc.fetchLocY())
        .writeD(npc.fetchLocZ())
        .writeD(npc.fetchHead())
        .writeD(0x00)  // ?
        .writeD(npc.fetchCastSpd())
        .writeD(npc.fetchAtkSpd())
        .writeD(npc.fetchRun())
        .writeD(npc.fetchWalk())
        .writeD(0x00)  // Swim
        .writeD(0x00)  // Swim
        .writeD(100)   // ?
        .writeD(100)   // ?
        .writeD(100)   // ?
        .writeD(100)   // ?
        .writeF(1.0)   // Move multiplier
        .writeF(1.0)   // Attack speed multiplier
        .writeF(npc.fetchRadius())
        .writeF(npc.fetchSize())
        .writeD(0x00)  // R hand
        .writeD(0x00)  // ?
        .writeD(0x00)  // L hand
        .writeC(0x01)  // Name above character
        .writeC(0x00)  // Run       = 0x01
        .writeC(0x00)  // Attack    = 0x01
        .writeC(0x00)  // Dead      = 0x01
        .writeC(0x00)  // Invisible = 0x01
        .writeS(npc.fetchName())
        .writeS(npc.fetchTitle())
        .writeD(0x00)  // ?
        .writeD(0x00)  // Pvp?
        .writeD(0x00)  // Pk?
        .writeD(0x00)  // Abnormal effect
        .writeD(0x00)  // Clan Id
        .writeD(0x00)  // Clan crest
        .writeD(0x00)  // Ally Id
        .writeD(0x00)  // Ally crest
        .writeC(0x00); // ?

    return packet.fetchBuffer();
}

module.exports = npcInfo;
