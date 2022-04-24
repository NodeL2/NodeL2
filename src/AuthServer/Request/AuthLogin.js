let ClientPacket = invoke('ClientPacket');

function authLogin(session, buffer) {
    let packet = new ClientPacket(buffer);
    invoke('Utils').dumpBuffer(packet.buffer);
    
    packet
        .readB(128);

    consume(session, {
        encryptedRSA : packet.data[0]
    });
}

function consume(session, data) {
    invoke('Utils').dumpBuffer(data.encryptedRSA);
    console.log(data.encryptedRSA.byteLength);

    let RSA = invoke('RSA');
    console.log(RSA.decrypt(data.encryptedRSA));
}

module.exports = authLogin;
