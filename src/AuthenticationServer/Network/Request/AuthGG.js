const ServerResponse = invoke('AuthenticationServer/Network/Response');
const ReceivePacket  = invoke('Packet/Receive');

function authGG(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Session Id
        .readD()  // Data 1
        .readD()  // Data 2
        .readD()  // Data 3
        .readD(); // Data 4

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
