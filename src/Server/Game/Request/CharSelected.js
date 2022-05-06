const ServerResponse = invoke('Server/Game/Response');
const Actor          = invoke('Server/Game/Actor');
const ClientPacket   = invoke('Packet/Client');
const Database       = invoke('Database');

function charSelected(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD(); // Character Slot

    consume(session, {
        characterSlot: packet.data[0]
    });
}

function consume(session, data) {
    Database.fetchCharacters(session.accountId).then((characters) => {
        const character = characters[data.characterSlot];

        Database.fetchClassInformation(character.classId).then((classInfo) => {
            // Create a new actor instance with info
            session.actor = new Actor({
                ...character, ...classInfo
            });
        });
    });
}

module.exports = charSelected;
