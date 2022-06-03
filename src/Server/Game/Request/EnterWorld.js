const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');

function enterWorld(session, buffer) {
    const packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    //session.dataSend(ServerResponse.sunrise());
    session.dataSend(ServerResponse.userInfo(session.actor));
}

module.exports = enterWorld;
