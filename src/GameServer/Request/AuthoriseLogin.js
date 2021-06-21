let ClientPacket = invoke('ClientPacket');
let Config       = invoke('Config');
let Database     = invoke('Database');
let Utils        = invoke('Utils');

function authoriseLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readS()  // Username
        .readD()  // Session Key (last)
        .readD()  // Session Key (first)
        .readD()  // ?
        .readD(); // ?

    consume(session, {
        username    : packet.data[0],
        sessionKey1 : packet.data[2],
        sessionKey2 : packet.data[1],
    });
}

function consume(session, data) {
    if (Utils.matchSessionKeys(data, Config.client)) {
        session.accountId = data.username;

        Database.fetchCharacters(session.accountId)
        .then((rows) => {

            console.log(rows);
        });
    }
}

module.exports = authoriseLogin;
