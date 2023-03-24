const SendPacket = invoke('Packet/Send');

function skillsList(skills) {
    const packet = new SendPacket(0x6d);

    packet
        .writeD(skills.length);

    for (const skill of skills) {
        packet
            .writeD(skill.fetchPassive())
            .writeD(skill.fetchLevel())
            .writeD(skill.fetchSelfId());
    }

    return packet.fetchBuffer();
}

module.exports = skillsList;
