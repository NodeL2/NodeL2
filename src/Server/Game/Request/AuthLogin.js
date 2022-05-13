const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');
const Config         = invoke('Config');
const Database       = invoke('Database');
const Utils          = invoke('Utils');

function authLogin(session, buffer) {
    const packet = new ClientPacket(buffer);

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
        session.accountId = data.username;

        Database.fetchCharacters(session.accountId).then((rows) => {
            session.dataSend(
                ServerResponse.charSelectInfo(rows)
            );
        });
    }
}

module.exports = authLogin;
