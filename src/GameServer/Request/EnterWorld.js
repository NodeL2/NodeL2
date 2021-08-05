let ClientPacket   = invoke('ClientPacket');
let ServerResponse = invoke('GameServer/Response');

function enterWorld(session, buffer) {
    let packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    session.sendData(ServerResponse.sunrise());
    session.sendData(ServerResponse.userInfo(session.player));
}

module.exports = enterWorld;
