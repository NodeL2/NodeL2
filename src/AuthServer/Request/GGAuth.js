let ClientPacket   = invoke('Packet/Client');
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
    session.dataSend(
        ServerResponse.authGG(data.sessionId)
    );
}

module.exports = authGG;
