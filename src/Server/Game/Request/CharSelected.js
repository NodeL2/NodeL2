const ServerResponse = invoke('Server/Game/Response');
const Actor          = invoke('Server/Game/Actor/Actor');
const ClientPacket   = invoke('Packet/Client');
const Database       = invoke('Database');

function charSelected(session, buffer) {
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

        Database.fetchClassInformation(character.classId).then((classInfo) => {
            // Create a new actor instance with info
            session.actor = new Actor({
                ...character, ...classInfo
            });

            session.dataSend(
                ServerResponse.charSelected(session.actor)
            );
        });
    });
}

module.exports = charSelected;
