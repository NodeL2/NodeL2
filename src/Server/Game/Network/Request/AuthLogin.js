const ServerResponse = invoke('Server/Game/Network/Response');
const Shared         = invoke('Server/Game/Network/Shared');
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
    session.setAccountId(data.username);

    Shared.fetchCharacters(session.accountId).then((characters) => {
        Shared.enterCharacterHall(session, characters);
    });
}

module.exports = authLogin;
