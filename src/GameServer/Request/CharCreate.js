let ClientPacket = invoke('ClientPacket');
let Database = invoke('Database');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function charCreate(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readS()  // Name
        .readD()  // Race
        .readD()  // Gender
        .readD()  // Class ID
        .readD()
        .readD()
        .readD()
        .readD()
        .readD()
        .readD()
        .readD()  // Hair Style
        .readD()  // Hair Color
        .readD(); // Face

    let data = {
        name: packet.data[1],
        race: packet.data[2],
        gender: packet.data[3],
        classId: packet.data[4],
        hairStyle: packet.data[11],
        hairColor: packet.data[12],
        face: packet.data[13]
    };

    Database.getBaseClass(data.classId)
        .then((stats) => {

            Database.addNewCharacter(session.player.accountId, data, stats[0])
                .then(() => {

                    session.sendData(
                        GameServerResponse.charCreateSuccess(), false
                    );

                    Database.getCharacters(session.player.accountId)
                        .then((rows) => {

                            session.sendData(
                                GameServerResponse.charSelectInfo(rows), false
                            );
                        });
                });
        });
}

module.exports = charCreate;
