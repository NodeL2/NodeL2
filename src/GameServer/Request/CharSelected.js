let ClientPacket   = invoke('ClientPacket');
let Database       = invoke('Database');
let ServerResponse = invoke('GameServer/Response');

function charSelected(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD(); // Character Slot

    consume(session, {
        characterSlot: packet.data[0]
    });
}

function consume(session, data) {
    // New player instance
    session.initPlayer();

    // Fill-in player base stats
    Database.fetchCharacters(session.accountId).then((characters) => {
        let character = characters[data.characterSlot];

        Database.fetchClassInformation(character.classId).then((classInfo) => {
            session.player.model = {
                ...character, ...classInfo
            };

            session.sendData(
                ServerResponse.charSelected(session.player)
            );
        });
    });
}

module.exports = charSelected;
