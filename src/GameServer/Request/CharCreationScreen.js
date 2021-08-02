let ClientPacket   = invoke('ClientPacket');
let ServerResponse = invoke('GameServer/Response');

function charCreationScreen(session, buffer) {
    let packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    session.sendData(
        ServerResponse.charTemplates()
    );
}

module.exports = charCreationScreen;
