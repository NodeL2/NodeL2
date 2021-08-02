let ClientPacket   = invoke('ClientPacket');
let Database       = invoke('Database');
let ServerResponse = invoke('GameServer/Response');

function createNewChar(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readS()  // Name
        .readD()  // Race
        .readD()  // Gender
        .readD()  // Class ID
        .readD()  // ?
        .readD()  // ?
        .readD()  // ?
        .readD()  // ?
        .readD()  // ?
        .readD()  // ?
        .readD()  // Hair Style
        .readD()  // Hair Color
        .readD(); // Face

    consume(session, {
        name      : packet.data[ 0],
        race      : packet.data[ 1],
        gender    : packet.data[ 2],
        classId   : packet.data[ 3],
        hairStyle : packet.data[10],
        hairColor : packet.data[11],
        face      : packet.data[12],
    });
}

function consume(session, data) {
    Database.fetchCharacters(session.accountId)
    .then((rows) => {

        session.sendData(
            ServerResponse.charSelectInfo(rows)
        );
    });
}

module.exports = createNewChar;
