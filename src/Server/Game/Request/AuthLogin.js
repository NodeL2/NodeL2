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
        .readD(); // Session Key (first)

    consume(session, {
        username    : packet.data[0],
        sessionKey1 : packet.data[2],
        sessionKey2 : packet.data[1],
    });
}

function consume(session, data) {
    if (Utils.matchSessionKeys(Config.client, data)) {
        session.accountId = data.username;

        Database.fetchCharacters(session.accountId).then((userChars) => {
            session.dataSend(
                ServerResponse.charSelectInfo(userChars)
            );
        });
    }
}

module.exports = authLogin;
