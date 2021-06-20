let ClientPacket   = invoke('ClientPacket');
let Config         = invoke('Config');
let ServerResponse = invoke('AuthServer/Response');

function gameLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD()  // Session Key (first)
        .readD()  // Session Key (last)
        .readC(); // Server ID

    consume(session, {
        sessionKey1 : packet.data[0],
        sessionKey2 : packet.data[1],
        serverId    : packet.data[2],
    });
}

function consume(session, data) {

    let config = Config.client;

    if (data.serverId === Config.gameServer.id) {
        if ((data.sessionKey1 === config.sessionKey1) && (data.sessionKey2 === config.sessionKey2)) {
            session.sendData(
                ServerResponse.gameSuccess(config)
            );
        }
        else { // Session keys don't match
            session.sendData(
                ServerResponse.gameFail(0x01)
            );
        }
    }
    else { // Invalid server id selected
        session.sendData(
            ServerResponse.gameFail(0x01)
        );
    }
}

module.exports = gameLogin;
