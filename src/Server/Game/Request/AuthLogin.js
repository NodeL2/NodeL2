let ClientPacket   = invoke('Packet/Client');

function authLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readS()  // Username
        .readD()  // Session Key (last)
        .readD(); // Session Key (first)

    consume(session, {
        username    : packet.data[0],
        sessionKey1 : packet.data[2],
        sessionKey2 : packet.data[1],
    });
}

function consume(session, data) {
    console.log(data.username);
    console.log(data.sessionKey1);
    console.log(data.sessionKey2);
}

module.exports = authLogin;
