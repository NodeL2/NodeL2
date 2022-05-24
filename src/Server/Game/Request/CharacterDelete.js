const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');
const Database       = invoke('Database');

function characterDelete(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readD(); // Character Slot

    consume(session, {
        characterSlot: packet.data[0]
    });
}

function consume(session, data) {
    infoWarn(data.characterSlot);

    Database.fetchCharacters(session.accountId).then((userChars) => { // TODO: The actual implementation :)
        session.dataSend(
            ServerResponse.charSelectInfo(userChars)
        );
    });
}

module.exports = characterDelete;
