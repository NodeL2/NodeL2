let ClientPacket = invoke('ClientPacket');

function authLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readB(128) // Encrypted Block
        .readD();   // Session ID

    consume(session, {
        encryptedRSA : packet.data[0]
    });
}

function consume(session, data) {
    let RSA = invoke('RSA');
    let decrypted = RSA.decrypt(data.encryptedRSA);
    invoke('Utils').dumpBuffer(decrypted);
    
    //console.log(invoke('Utils').toAsciiStripNull(decrypted));
    //invoke('Utils').dumpBuffer(decrypted);
    //let username = decrypted.slice(0x62, 0x62 + 14);
    //let password = decrypted.slice(0x70, 0x70 + 16);
}

module.exports = authLogin;
