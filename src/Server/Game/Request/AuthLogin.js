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
    console.log('0x%s', Utils.toHex(data.username, 8)); // OK
    console.log('0x%s', Utils.toHex(data.sessionKey1, 8));
    console.log('0x%s', Utils.toHex(data.sessionKey2, 8));
    console.log('0x%s', Utils.toHex(data.loginKey1, 8)); // OK
    console.log('0x%s', Utils.toHex(data.loginKey2, 8));
    //if (Utils.matchSessionKeys(Config.client, data)) {
        //session.accountId = data.username;

        //Database.fetchCharacters('q').then((rows) => {
        //    session.dataSend(
        //        ServerResponse.charSelectInfo(rows)
        //    );
        //});
    //}
}

module.exports = authLogin;
