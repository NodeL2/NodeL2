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

function consume(session, data) {
    if (session.actor.skillset.fetchSkill(data.selfId)?.fetchPassive() ?? false) {
        return;
    }

    session.actor.skillAction(session, data);
}

module.exports = skillUse;
