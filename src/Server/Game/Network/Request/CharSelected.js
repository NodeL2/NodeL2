const ServerResponse = invoke('Server/Game/Network/Response');
const DataCache      = invoke('Server/Game/DataCache');
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

        DataCache.fetchClassInformation(character.classId).then((classInfo) => {
            // Create a new actor instance with info
            delete classInfo.bornAt;

            session.setActor({
                ...character, ...utils.crushOb(classInfo)
            });

            session.dataSend(
                ServerResponse.charSelected(session.actor.model)
            );
        });
    });
}

module.exports = charSelected;
