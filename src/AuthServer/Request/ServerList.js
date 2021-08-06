let ClientPacket   = invoke('ClientPacket');
let Config         = invoke('Config');
let ServerResponse = invoke('AuthServer/Response');
let Utils          = invoke('Utils');

function serverList(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD()  // Session Key (first)
        .readD(); // Session Key (last)

    consume(session, {
        sessionKey1: packet.data[0],
        sessionKey2: packet.data[1],
    });
}

function consume(session, data) {
    if (Utils.matchSessionKeys(Config.client, data)) {
        session.sendData(
            ServerResponse.serverList(Config.gameServer)
        );
    }
    else { // Session keys don't match
        session.sendData(
            ServerResponse.loginFail(0x01)
        );
    }
}

module.exports = serverList;
