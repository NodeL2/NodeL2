const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');
const Database       = invoke('Database');

function authLogin(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readS()  // Username
        .readD()  // Session Key (last)
        .readD(); // Session Key (first)

    consume(session, {
        username : packet.data[0],
        key2     : packet.data[1],
        key1     : packet.data[2],
    });
}

function consume(session, data) { // TODO: Need to match the Session Keys
    session.accountId = data.username;

    Database.fetchCharacters(session.accountId).then((userChars) => {
        session.dataSend(
            ServerResponse.charSelectInfo(userChars)
        );
    });
}

module.exports = authLogin;
