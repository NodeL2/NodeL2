let ServerResponse = invoke('Server/Auth/Response');
let ClientPacket   = invoke('Packet/Client');
let Config         = invoke('Config');
let Database       = invoke('Database');
let Utils          = invoke('Utils');

function authLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readB(128) // Enciphered Block
        .readD();   // Session ID

    let deciphered = require('rsa-raw').decipher(
        packet.data[0]
    );

    consume(session, {
        username  : Utils.stripNull(deciphered.slice(0x5e, 0x5e + 14)), // <= C4: 0x62
        password  : Utils.stripNull(deciphered.slice(0x6c, 0x6c + 16)), // <= C4: 0x70
        sessionId : packet.data[1]
    });
}

function passwordMatch(session, username) {
    session.accountId = username;
    session.dataSend(ServerResponse.loginSuccess(Config.client));
}

function failure(session, reason) {
    session.dataSend(ServerResponse.loginFail(reason));
}

function consume(session, data) { // TODO: Check the Session ID
    Database.fetchUserPassword(data.username).then((rows) => {
        const password = rows[0]?.password;

        // Username exists in database
        if (password) {
            data.password === password ? passwordMatch(session, data.username) : failure(0x02);
        }
        else { // User account does not exist, create if needed
            if (Config.authServer.autoCreate) {
                Database.createAccount(data.username, data.password).then(() => {
                    consume(session, data);
                });
            }
            else { // Auto-create not permitted
                failure(0x04);
            }
        }
    });
}

module.exports = authLogin;
