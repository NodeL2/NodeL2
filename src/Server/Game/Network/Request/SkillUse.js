const ServerResponse = invoke('Server/Game/Network/Response');
const DataCache      = invoke('Server/Game/DataCache');
const ReceivePacket  = invoke('Server/Packet/Receive');

function skillUse(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Skill Id
        .readD()  // Ctrl
        .readC(); // Shift

    consume(session, {
           id: packet.data[0],
         ctrl: packet.data[1],
        shift: packet.data[2],
    });
}

function consume(session, data) {
    DataCache.fetchSkillDetailsFromId(data.id).then((details) => {
        data = {
            ...data, ...details
        }

        session.dataSend(
            ServerResponse.skillStarted(session.actor, utils.crushOb(data))
        );
    });
}

module.exports = skillUse;
