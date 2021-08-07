let ClientPacket   = invoke('ClientPacket');
let ServerResponse = invoke('GameServer/Response');

function logout(session, buffer) {
    let packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    session.sendData(
        ServerResponse.logoutSuccess()
    );
}

module.exports = logout;
