let ClientPacket   = invoke('ClientPacket');
let ServerResponse = invoke('GameServer/Response');
let World          = invoke('GameServer/World');

function enterWorld(session, buffer) {
    let packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    session.sendData(ServerResponse.sunrise());
    session.sendData(ServerResponse.userInfo(session.player));

    // Mock data
    World.insertNpcs(session);
}

module.exports = enterWorld;
