let AuthServerResponse = invoke('AuthServer/AuthServerResponse');
let ClientPacket = invoke('ClientPacket');
let Database = invoke('Database');
let Utils = invoke('Utils');

function authorizeLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readB(14)  // Username
        .readB(16); // Password

    let data = {
        username: Utils.toAsciiStripNull(packet.data[1]),
        password: Utils.toAsciiStripNull(packet.data[2]),
    };

    Database.getAccountPassword(data.username)
        .then((rows) => {

            if (rows[0]?.password === data.password) {
                session.sendData(
                    AuthServerResponse.loginOk()
                );
            }
            else {
                // 0x01 System error
                // 0x02 Password does not match this account
                // 0x04 Access failed
                // 0x07 The account is already in use
                session.sendData(
                    AuthServerResponse.loginFail(0x02)
                );
            }
        });
}

module.exports = authorizeLogin;
