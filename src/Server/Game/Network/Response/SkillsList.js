const SendPacket = invoke('Server/Packet/Send');

function skillsList(skills) {
    const packet = new SendPacket(0x58);

    packet
        .writeD(skills.length);

    for (const skill of skills) {
        packet
            .writeD(skill.passive)
            .writeD(skill.level)
            .writeD(skill.selfId);
    }

    return packet.fetchBuffer();
}

module.exports = skillsList;
