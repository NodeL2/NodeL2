const ServerResponse = invoke('Server/Game/Network/Response');
const ReceivePacket  = invoke('Server/Packet/Receive');

function speak(session, buffer) {
    let packet = new ReceivePacket(buffer);

    packet
        .readS()  // Text
        .readD(); // Kind

    consume(session, {
        text: packet.data[0],
        kind: packet.data[1],
    });
}

function consume(session, data) {
    if (data.kind === 0 && data.text === '.unstuck') {
        session.dataSend(
            ServerResponse.teleportToLocation(session.actor.fetchId(), {
                locX: 80304,
                locY: 56241,
                locZ: -1500,
            })
        );
        return;
    }

    session.dataSend(
        ServerResponse.speak(session.actor, data)
    );
}

module.exports = speak;
