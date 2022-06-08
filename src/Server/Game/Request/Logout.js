const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');

function logout(session, buffer) {
    const packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    session.dataSend(
        ServerResponse.logoutSuccess()
    );
}

module.exports = logout;
