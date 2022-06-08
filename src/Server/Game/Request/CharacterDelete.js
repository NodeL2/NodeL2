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
    Database.fetchCharacters(session.accountId).then((userChars) => {
        const character = userChars[data.characterSlot];

        Database.deleteCharacter(session.accountId, character.name).then(() => {
            userChars.splice(data.characterSlot, 1);
            session.dataSend(ServerResponse.charSelectInfo(userChars));
        });
    });
}

module.exports = characterDelete;
