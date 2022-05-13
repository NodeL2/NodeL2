let ServerResponse = invoke('Server/Game/Response');
let ClientPacket   = invoke('Packet/Client');
let Config         = invoke('Config');
let Database       = invoke('Database');
let Utils          = invoke('Utils');

function authLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readS()  // Username
        .readD()  // Session Key (last)
        .readD()  // Session Key (first)
        .readD()
        .readD();

    consume(session, {
        username    : packet.data[0],
        sessionKey1 : packet.data[2],
        sessionKey2 : packet.data[1],
        loginKey1   : packet.data[3],
        loginKey2   : packet.data[4],
    });
}

function consume(session, data) {
    if (Utils.matchSessionKeys(Config.client, data)) {
        Database.fetchCharacters(session.accountId).then((rows) => {
            session.dataSend(
                ServerResponse.charSelectInfo(rows)
            );
        });
    }
}

module.exports = authLogin;
