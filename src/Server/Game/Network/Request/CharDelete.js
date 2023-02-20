const Shared        = invoke('Server/Game/Network/Shared');
const ReceivePacket = invoke('Server/Packet/Receive');
const Database      = invoke('Server/Database');

function charDelete(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Character Slot

    consume(session, {
        characterSlot: packet.data[0]
    });
}

function consume(session, data) {
    Shared.fetchCharacters(session.accountId).then((characters) => {
        const character = characters[data.characterSlot];

        Database.deleteCharacter(session.accountId, character.name).then(() => {

            // Clear database from all actor created content
            Database.deleteSkills   (character.id);
            Database.deleteItems    (character.id);
            Database.deleteShortcuts(character.id);

            characters.splice(data.characterSlot, 1);
            Shared.enterCharacterHall(session, characters);
        });
    });
}

module.exports = charDelete;
