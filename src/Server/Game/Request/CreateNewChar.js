let ServerResponse = invoke('Server/Game/Response');
let ClientPacket   = invoke('Packet/Client');
let Database       = invoke('Database');

function createNewChar(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readS()  // Name
        .readD()  // Race
        .readD()  // Sex
        .readD()  // Class ID
        .readD()  // Int
        .readD()  // Str
        .readD()  // Con
        .readD()  // Men
        .readD()  // Dex
        .readD()  // Wit
        .readD()  // Hair
        .readD()  // Hair Color
        .readD(); // Face

    consume(session, {
        name      : packet.data[ 0],
        race      : packet.data[ 1],
        sex       : packet.data[ 2],
        classId   : packet.data[ 3],
        hair      : packet.data[10],
        hairColor : packet.data[11],
        face      : packet.data[12],
    });
}

function consume(session, data) {
    console.info(data);
}

module.exports = createNewChar;
