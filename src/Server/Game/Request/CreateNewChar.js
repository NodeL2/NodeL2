const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');
const Database       = invoke('Database');

function createNewChar(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readS()  // Name
        .readD()  // Race
        .readD()  // Sex
        .readD()  // Class ID
        .readD()  // Int (constant 0?)
        .readD()  // Str (constant 0?)
        .readD()  // Con (constant 0?)
        .readD()  // Men (constant 0?)
        .readD()  // Dex (constant 0?)
        .readD()  // Wit (constant 0?)
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
}

module.exports = createNewChar;
