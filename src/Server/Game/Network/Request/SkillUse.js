const DataCache     = invoke('Server/Game/DataCache');
const ReceivePacket = invoke('Server/Packet/Receive');

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
    DataCache.fetchSkillDetailsFromId(data.selfId).then((details) => {
        if (details.template.passive) {
            return;
        }

        session.actor.requestedSkillAction(session, utils.crushOb({
            ...data, ...details
        }));
    });
}

module.exports = skillUse;
