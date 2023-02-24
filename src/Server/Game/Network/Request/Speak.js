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
    if (data.kind === 0) { // TODO: Remove, temp solution
        if (data.text === '.unstuck') {
            session.actor.unstuck(session);
            return;
        }
        else
        if (data.text === '.admin') {
            session.actor.admin(session);
            return;
        }
    }

    session.dataSend(
        ServerResponse.speak(session.actor, data)
    );
}

module.exports = speak;
