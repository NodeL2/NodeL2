const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');
const Database       = invoke('Database');

function backToHall(session, buffer) {
    const packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    Database.fetchCharacters(session.accountId).then((userChars) => {
        session.dataSend(
            ServerResponse.charSelectInfo(userChars)
        );
    });
}

module.exports = backToHall;
