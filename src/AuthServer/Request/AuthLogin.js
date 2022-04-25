let ClientPacket = invoke('ClientPacket');

function authLogin(session, buffer) {
    let packet = new ClientPacket(buffer);
    
    packet
        .readB(128);

    consume(session, {
        encryptedRSA : packet.data[1]
    });
}

function consume(session, data) {
    let RSA = invoke('RSA');
    invoke('Utils').dumpBuffer(data.encryptedRSA);
    let decrypted = RSA.decrypt(data.encryptedRSA);
    invoke('Utils').dumpBuffer(decrypted);
    let username = decrypted.slice(0x5e, 0x5e + 14);
    let password = decrypted.slice(0x6c, 0x6c + 16);
    console.log(username.toString('utf16le'));
    console.log(password.toString('ucs2'));
    console.log(invoke('Utils').toAsciiStripNull(username));
    console.log(invoke('Utils').toAsciiStripNull(password));
}

module.exports = authLogin;
