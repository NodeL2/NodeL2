let ClientPacket = invoke('ClientPacket');
let Database = invoke('Database');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function charSelected(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD();

    let data = {
        characterSlot: packet.data[1]
    };

    Database.getCharacters(session.player.accountId)
        .then((characters) => {
            let character = characters[data.characterSlot];

            Database.getBaseClass(character.class_id)
                .then((stats) => {

                    session.player.setProperties( // Set player properties
                        character
                    );

                    session.player.setBaseStats(
                        stats[0]
                    );

                    session.sendData(
                        GameServerResponse.charSelected(session.player), false
                    );
                });
        });
}

module.exports = charSelected;
