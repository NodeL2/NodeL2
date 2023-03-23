const ServerResponse = invoke('GameServer/Network/Response');
const Shared         = invoke('GameServer/Network/Shared');
const ReceivePacket  = invoke('Packet/Receive');

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
            session.setActor({
                ...character, ...utils.crushOb(classInfo)
            });

            session.dataSend(
                ServerResponse.charSelected(session.actor)
            );
        });
    });
}

module.exports = charSelected;
