const World         = invoke('GameServer/World/World');
const ReceivePacket = invoke('Packet/Receive');

function askForTeamUp(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Id
        .readD(); // Distribution

    consume(session, {
                  id: packet.data[0],
        distribution: packet.data[1],
    });
}

function consume(session, data) {
    World.askForTeamUp(session, session.actor, data);
}

module.exports = askForTeamUp;
