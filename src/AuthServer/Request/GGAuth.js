let ClientPacket   = invoke('ClientPacket');
let ServerResponse = invoke('AuthServer/Response');

function authGG(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD(); // Session ID

    consume(session, {
        sessionId: packet.data[0]
    });
}

function consume(session, data) {
    session.sendData(
        ServerResponse.authGG(data.sessionId)
    );
}

module.exports = authGG;
