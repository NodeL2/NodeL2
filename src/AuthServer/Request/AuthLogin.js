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
    //let username = decrypted.slice(0x5e, 0x5e + 14); // 0x62
    //let password = decrypted.slice(0x6c, 0x6c + 16); // 0x70
    console.log(decrypted.toString('ucs2'));
    console.log(invoke('Utils').toAsciiStripNull(decrypted));
}

module.exports = authLogin;
