let ClientPacket = invoke('ClientPacket');
let { authGG } = invoke('AuthServer/Response/GGAuth');
let { toHex } = invoke('Utils');

exports.authGG = (session, buffer) => {
    let packet = new ClientPacket(buffer);

    packet
        .readD(); // Session Key

    consume(session, {
        sessionKey : packet.data[0]
    });
};

function consume(session, data) {
    console.log(toHex(data.sessionKey, 8));
    session.sendData(
        authGG()
    );
}
