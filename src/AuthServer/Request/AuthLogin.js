let ClientPacket = invoke('ClientPacket');

function authLogin(session, buffer) {
    let packet = new ClientPacket(buffer);
    
    packet
        .readB(128);

    consume(session, {
        encryptedRSA : packet.data[0]
    });
}

function consume(session, data) {
    let RSA = invoke('RSA');
    invoke('Utils').dumpBuffer(data.encryptedRSA);
    let decrypted = RSA.decrypt(data.encryptedRSA);
    invoke('Utils').dumpBuffer(decrypted);
    let username = decrypted.slice(0x62, 0x62 + 14);
    let password = decrypted.slice(0x70, 0x70 + 16);
    console.log(decrypted.toString('ucs2'));
    console.log(invoke('Utils').toAsciiStripNull(decrypted));
    console.log(invoke('Utils').toAsciiStripNull(username));
    console.log(invoke('Utils').toAsciiStripNull(password));
}

module.exports = authLogin;
