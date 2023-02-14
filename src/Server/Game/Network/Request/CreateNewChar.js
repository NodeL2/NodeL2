const ServerResponse = invoke('Server/Game/Network/Response');
const ClientPacket   = invoke('Server/Packet/Client');
const Database       = invoke('Server/Database');

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
    Database.fetchClassInformation(data.classId).then((classInfo) => {
        const points = classInfo.bornAt;
        const coords = points[utils.randomNumber(points.length)];

        data = {
            ...data, ...classInfo.vitals, ...coords
        };

        Database.createCharacter(session.accountId, data).then(() => {
            session.dataSend(
                ServerResponse.charCreateSuccess()
            );

            Database.fetchCharacters(session.accountId).then((userChars) => {
                session.dataSend(
                    ServerResponse.charSelectInfo(userChars)
                );
            });
        });
    });
}

module.exports = createNewChar;
