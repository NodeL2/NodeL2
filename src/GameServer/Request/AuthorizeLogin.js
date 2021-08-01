let ClientPacket = invoke('ClientPacket');
let Config = invoke('Config');
let Database = invoke('Database');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function authorizeLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readS()  // Username
        .readD()  // Session Key (last)
        .readD()  // Session Key (first)
        .readD()  // ?
        .readD(); // ?

    let data = {
        username:
            packet.data[1],

        sessionKey: [
            packet.data[3],
            packet.data[2],
        ]
    };

    if (data.sessionKey.isEqualTo(Config.sessionKey)) {
        session.accountId = data.username;

        Database.getCharacters(session.accountId)
        .then((rows) => {

            session.sendData(
                GameServerResponse.charSelectInfo(rows)
            );
        });
    }
}

module.exports = authorizeLogin;