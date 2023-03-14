const SendPacket = invoke('Packet/Send');

function skillStarted(actor, npcId, skill) {
    const packet = new SendPacket(0x48);

    packet
        .writeD(actor.fetchId())
        .writeD(npcId)
        .writeD(skill.fetchSelfId())
        .writeD(0x01)
        .writeD(skill.fetchCalculatedHitTime())
        .writeD(skill.fetchReuseTime())
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocY())
        .writeD(actor.fetchLocZ())
        .writeH(0x00);

    return packet.fetchBuffer();
}

module.exports = skillStarted;
