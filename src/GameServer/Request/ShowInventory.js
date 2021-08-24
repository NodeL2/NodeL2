let ClientPacket   = invoke('ClientPacket');
let ServerResponse = invoke('GameServer/Response');

function showInventory(session, buffer) {
    let packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    session.sendData(
        ServerResponse.showInventory()
    );
}

module.exports = showInventory;
