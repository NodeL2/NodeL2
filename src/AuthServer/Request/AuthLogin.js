let Database     = invoke('Database');
let ClientPacket = invoke('ClientPacket');
let Utils        = invoke('Utils');

function authLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readB(128) // Encrypted Block
        .readD();   // Session ID

    let decrypted = invoke('RSA').decrypt(packet.data[0]);

    consume(session, {
        username: decrypted.slice(0x62, 0x62 + 14),
        password: decrypted.slice(0x70, 0x70 + 16),
    });
}

function consume(session, data) {
    let username = Utils.stripNull(data.username);
    let password = Utils.stripNull(data.password);

    Database.fetchUserPassword(username).then(rows => {
        const password = rows[0]?.password;

        // Username exists in database
        if (password) {
            console.log('Username exists, check password');
        }
        else {
            console.log('Username does not exist, create account');
        }
    });
}

module.exports = authLogin;
