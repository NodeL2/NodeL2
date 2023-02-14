const ServerResponse = invoke('Server/Game/Network/Response');
const Actor          = invoke('Server/Game/Actor/Actor');
const ReceivePacket  = invoke('Server/Packet/Receive');
const Database       = invoke('Server/Database');

function charSelected(session, buffer) {
    const packet = new ReceivePacket(buffer);

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
                ...character, ...classInfo.template, ...classInfo.base, ...classInfo.stats, ...classInfo.vitals, ...classInfo.speed, ...classInfo.collision
            });

            session.dataSend(
                ServerResponse.charSelected(session.actor.model)
            );
        });
    });
}

module.exports = charSelected;
