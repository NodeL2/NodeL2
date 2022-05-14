let ServerResponse = invoke('Server/Game/Response');
let ClientPacket   = invoke('Packet/Client');
let Database       = invoke('Database');

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
        raceId    : packet.data[ 1],
        gender    : packet.data[ 2],
        classId   : packet.data[ 3],
        hairId    : packet.data[10],
        hairColor : packet.data[11],
        face      : packet.data[12],
    });
}

function consume(session, data) {
    console.info(data.name);
}

module.exports = createNewChar;
