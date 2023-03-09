const ReceivePacket = invoke('Packet/Receive');

function skillUse(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Skill Id
        .readD()  // Ctrl
        .readC(); // Shift

    consume(session, {
        selfId: packet.data[0],
          ctrl: packet.data[1],
         shift: packet.data[2],
    });
}

function consume(session, data) { // TODO: Broken ctrl
    const skill = session.actor.skillset.fetchSkill(data.selfId);
    skill.fetchPassive() ? {} : session.actor.requestedSkillAction(session, skill);
}

module.exports = skillUse;
