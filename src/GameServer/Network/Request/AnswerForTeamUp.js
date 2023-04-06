const World         = invoke('GameServer/World/World');
const ReceivePacket = invoke('Packet/Receive');

function answerForTeamUp(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Id

    consume(session, {
        id: packet.data[0],
    });
}

function consume(session, data) {
    World.answerForTeamUp(session, session.actor, data);
}

module.exports = answerForTeamUp;
