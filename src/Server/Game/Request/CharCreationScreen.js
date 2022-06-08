const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');

function charCreationScreen(session, buffer) {
    const packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    session.dataSend(
        ServerResponse.charTemplates()
    );
}

module.exports = charCreationScreen;
