const ServerResponse = invoke('Server/Game/Network/Response');
const ReceivePacket  = invoke('Server/Packet/Receive');

function skillUse(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Skill Id
        .readD()  // Ctrl
        .readC(); // Shift

    consume(session, {
        skillId: packet.data[0],
           ctrl: packet.data[1],
          shift: packet.data[2],
    });
}

function consume(session, data) {
    session.dataSend(
        ServerResponse.skillStarted(session.actor, data.skillId)
    );
}

module.exports = skillUse;
