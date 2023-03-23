const SendPacket = invoke('Packet/Send');

function skillsList(skills) {
    const packet = new SendPacket(0x58);

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
