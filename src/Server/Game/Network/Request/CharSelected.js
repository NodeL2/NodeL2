const ServerResponse = invoke('Server/Game/Network/Response');
const Shared         = invoke('Server/Game/Network/Shared');
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
    Shared.fetchCharacters(session.accountId).then((characters) => {
        const character = characters[data.characterSlot];

        Shared.fetchClassInformation(character.classId).then((classInfo) => {
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
