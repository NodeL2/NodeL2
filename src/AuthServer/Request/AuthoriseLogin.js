let ClientPacket   = invoke('ClientPacket');
let Config         = invoke('Config');
let Database       = invoke('Database');
let ServerResponse = invoke('AuthServer/Response');
let Utils          = invoke('Utils');

function authoriseLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readB(14)  // Username
        .readB(16); // Password

    consume(session, {
        username: Utils.toAsciiStripNull(packet.data[0]),
        password: Utils.toAsciiStripNull(packet.data[1]),
    });
}

function consume(session, data) {
    Database.fetchAccountPassword(data.username).then((rows) => {
        const password = rows[0]?.password;

        if (password) {
            session.sendData(
                data.password === password ? ServerResponse.loginSuccess(Config.client) : ServerResponse.loginFail(0x02)
            );
        }
        else {
            if (Config.authServer.autoCreate) {
                Database.addNewAccount(data.username, data.password).then(() => {
                    consume(session, data);
                });
            }
            else {
                ServerResponse.loginFail(0x04)
            }
        }
    });
}

module.exports = authoriseLogin;
