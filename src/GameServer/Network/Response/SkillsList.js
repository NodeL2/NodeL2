const SendPacket = invoke('Packet/Send');

function skillsList(skills) {
    const packet = new SendPacket(0x6d);

    packet
        .writeD(utils.size(skills));

    skills.forEach((skill) => {
        packet
            .writeD(skill.fetchPassive())
            .writeD(skill.fetchLevel())
            .writeD(skill.fetchSelfId());
    });

    return packet.fetchBuffer();
}

module.exports = skillsList;
