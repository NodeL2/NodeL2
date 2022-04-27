let ClientPacket = invoke('ClientPacket');

function authLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readB(128) // Encrypted Block
        .readD();   // Session ID

    consume(session, {
        encrypted : packet.data[0]
    });
}

function consume(session, data) {
    let decrypted = invoke('RSA').decrypt(data.encrypted);
    let username  = decrypted.slice(0x62, 0x62 + 14);
    let password  = decrypted.slice(0x70, 0x70 + 16);

    console.log(username);
    console.log(password);
}

module.exports = authLogin;
