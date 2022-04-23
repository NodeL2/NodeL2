let ClientPacket   = invoke('ClientPacket');
let ServerResponse = invoke('AuthServer/Response');

function authGG(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD(); // Session Key

    consume(session, {
        sessionKey : packet.data[0]
    });
}

function consume(session, data) {
    console.log(invoke('Utils').toHex(data.sessionKey, 8));
    session.sendData(
        authGG()
    );
}

module.exports = authGG;
