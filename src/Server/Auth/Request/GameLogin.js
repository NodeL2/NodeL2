let ServerResponse = invoke('Server/Auth/Response');
let ClientPacket   = invoke('Packet/Client');
let Config         = invoke('Config');
let Utils          = invoke('Utils');

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
    if (Utils.matchSessionKeys(Config.client, data)) {
        if (Config.gameServer.id === data.serverId) {
            session.dataSend(
                ServerResponse.gameSuccess(Config.client)
            );
        }
        else { // Invalid server id selected
            session.dataSend(
                ServerResponse.gameFail(0x01)
            );
        }
    }
    else { // Session keys don't match
        session.dataSend(
            ServerResponse.gameFail(0x01)
        );
    }
}

module.exports = gameLogin;
