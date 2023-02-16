const ServerResponse = invoke('Server/Game/Network/Response');
const Common         = invoke('Server/Game/Network/Common');
const ReceivePacket  = invoke('Server/Packet/Receive');

function authLogin(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readS()  // Username
        .readD()  // Session Key (last)
        .readD(); // Session Key (first)

    consume(session, {
        username: packet.data[0],
            key2: packet.data[1],
            key1: packet.data[2],
    });
}

function consume(session, data) { // TODO: Need to match the Session Keys
    session.accountId = data.username;
    Common.fetchCharacters(session);
}

module.exports = authLogin;
