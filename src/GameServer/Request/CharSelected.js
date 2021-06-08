let ClientPacket = invoke('ClientPacket');
let Database = invoke('Database');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function charSelected(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD(); // Character Slot

    let data = {
        characterSlot: packet.data[1]
    };

    // New player instance
    session.initPlayer();

    // Fill-in player specs
    Database.getCharacters(session.accountId)
    .then((characters) => {
        let character = characters[data.characterSlot];

        Database.getBaseClass(character.class_id)
        .then((stats) => {

            session.player.model.parseBasicInfo(session.player, character);
            session.player.model.parseStatisticsInfo(session.player, stats[0]);
            session.player.inventory.populate(session.player);

            session.sendData(GameServerResponse.charSelected(session.player));
        });
    });
}

module.exports = charSelected;
