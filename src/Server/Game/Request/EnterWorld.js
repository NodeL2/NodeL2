let ServerResponse = invoke('Server/Game/Response');
let ClientPacket   = invoke('Packet/Client');

function enterWorld(session, buffer) {
    let packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    session.dataSend(
        ServerResponse.userInfo(session.actor)
    );
}

module.exports = enterWorld;
