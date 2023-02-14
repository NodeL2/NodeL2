const ServerResponse = invoke('Server/Game/Network/Response');
const ReceivePacket  = invoke('Server/Packet/Receive');
const Database       = invoke('Server/Database');

function charDelete(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Character Slot

    consume(session, {
        characterSlot: packet.data[0]
    });
}

function consume(session, data) {
    Database.fetchCharacters(session.accountId).then((userChars) => {
        const character = userChars[data.characterSlot]

        Database.deleteCharacter(session.accountId, character.name).then(() => {
            userChars.splice(data.characterSlot, 1);
            session.dataSend(ServerResponse.charSelectInfo(userChars));
        });
    });
}

module.exports = charDelete;
