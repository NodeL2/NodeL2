let AuthServerResponse = invoke('AuthServer/AuthServerResponse');
let ClientPacket = invoke('ClientPacket');
let Config = invoke('Config');
let Utils = invoke('Utils');

function gameLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD()  // Session Key (first)
        .readD()  // Session Key (last)
        .readC(); // Server ID

    let data = {
        sessionKey: [
            packet.data[1],
            packet.data[2],
        ],
        serverID: packet.data[3]
    };

    if (data.sessionKey.isEqualTo(Config.sessionKey)) {
        if (true) {
            session.sendData(
                AuthServerResponse.playOk(Config.sessionKey)
            );
        } else {
            // 0x01 System error
            // 0x02 Password does not match this account
            // 0x04 Access failed
            // 0x07 The account is already in use
            session.sendData(
                AuthServerResponse.playFail(0x01)
            );
        }
    }
}

module.exports = gameLogin;
