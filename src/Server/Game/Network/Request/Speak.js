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
    if (data.kind === 0 && data.text === '.unstuck') { // TODO: Remove, temp solution
        session.actor.unstuck(session);
        return;
    }

    session.dataSend(
        ServerResponse.speak(session.actor, data)
    );
}

module.exports = speak;
