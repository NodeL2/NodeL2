const ServerResponse = invoke('Server/Auth/Response');
const ClientPacket   = invoke('Packet/Client');

function authGG(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readD(); // Session ID

    consume(session, {
        sessionId: packet.data[0]
    });
}

function consume(session, data) { // TODO: Check the Session ID
    session.dataSend(
        ServerResponse.authGG(data.sessionId)
    );
}

module.exports = authGG;
