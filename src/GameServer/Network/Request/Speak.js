const ServerResponse = invoke('GameServer/Network/Response');
const ReceivePacket  = invoke('Packet/Receive');

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
    if (data.kind === 0) { // TODO: Remove, temp solution
        if (data.text === '.admin') {
            invoke(path.actor).adminPanel(session, session.actor);
            return;
        }
    }

    session.dataSend(ServerResponse.speak(session.actor, data), session.actor);
}

module.exports = speak;
