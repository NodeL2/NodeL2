const ServerResponse = invoke('AuthenticationServer/Network/Response');
const ReceivePacket  = invoke('Packet/Receive');

function gameLogin(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Session Key (first)
        .readD()  // Session Key (last)
        .readC(); // Server ID

    consume(session, {
        key1     : packet.data[0],
        key2     : packet.data[1],
        serverId : packet.data[2],
    });
}

function consume(session, data) {
    if (utils.sessionMatch(session, data)) {
        const optn = options.connection.GameServer;

        if (optn.id === data.serverId) {
            session.dataSend(
                ServerResponse.gameSuccess(session)
            );
            return;
        }
    }

    session.dataSend( // Invalid Server ID or Session Keys don't match
        ServerResponse.gameFail(0x01)
    );
}

module.exports = gameLogin;
