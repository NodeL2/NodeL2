let ClientPacket   = invoke('ClientPacket');
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
    Database.fetchAccountPassword(data.username)
    .then((rows) => {

        if (data.password === rows[0]?.password) {
            session.sendData(
                ServerResponse.loginSuccess()
            );
        }
        else {
            // 0x01 System error
            // 0x02 Password does not match this account
            // 0x04 Access failed
            // 0x07 The account is already in use
            session.sendData(
                ServerResponse.loginFail(0x02)
            );
        }
    });
}

module.exports = authoriseLogin;
