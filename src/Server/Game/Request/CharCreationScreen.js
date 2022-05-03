let ServerResponse = invoke('Server/Game/Response');
let ClientPacket   = invoke('Packet/Client');

function charCreationScreen(session, buffer) {
    let packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    session.dataSend(
        ServerResponse.charTemplates()
    );
}

module.exports = charCreationScreen;
