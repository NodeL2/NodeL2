const ServerResponse = invoke('Server/Game/Network/Response');
const Common         = invoke('Server/Game/Network/Common');
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

            Database.deleteSkills(character.id);
            Database.deleteItems (character.id);

            Common.fetchCharacters(session);
        });
    });
}

module.exports = charDelete;
