const SendPacket = invoke('Packet/Send');

function npcInfo(npc) {
    const packet = new SendPacket(0x22);

    packet
        .writeD(npc.fetchId())
        .writeD(npc.fetchDispSelfId())
        .writeD(npc.fetchAttackable())
        .writeD(npc.fetchLocX())
        .writeD(npc.fetchLocY())
        .writeD(npc.fetchLocZ())
        .writeD(npc.fetchHead())
        .writeD(0x00)  // ?
        .writeD(npc.fetchCollectiveCastSpd())
        .writeD(npc.fetchCollectiveAtkSpd())
        .writeD(npc.fetchCollectiveRunSpd())
        .writeD(npc.fetchCollectiveWalkSpd())
        .writeD(0x00)  // Swim
        .writeD(0x00)  // Swim
        .writeD(100)   // ?
        .writeD(100)   // ?
        .writeD(100)   // ?
        .writeD(100)   // ?
        .writeF(1.1)   // Move multiplier
        .writeF(npc.fetchAtkSpdMultiplier())
        .writeF(npc.fetchRadius())
        .writeF(npc.fetchSize())
        .writeD(npc.fetchWeapon())
        .writeD(npc.fetchArmor())
        .writeD(npc.fetchShield())
        .writeC(0x01)  // Name above character
        .writeC(npc.fetchStateRun())
        .writeC(npc.fetchStateAttack())
        .writeC(npc.fetchStateDead())
        .writeC(npc.fetchStateInvisible())
        .writeS(npc.fetchName())
        .writeS(npc.fetchTitle())
        .writeD(0x00)  // ?
        .writeD(0x00)  // Pvp?
        .writeD(0x00); // Pk?

    return packet.fetchBuffer();
}

module.exports = npcInfo;
