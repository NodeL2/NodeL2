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
        .then((rows) => {

            session.player.setProperties( // Set player properties
                rows[data.characterSlot]
            );

            session.sendData(
                GameServerResponse.charSelected(session.player), false
            );
        });
}

module.exports = charSelected;
