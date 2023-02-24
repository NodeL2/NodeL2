const ServerResponse = invoke('Server/Game/Network/Response');
const Shared         = invoke('Server/Game/Network/Shared');
const DataCache      = invoke('Server/Game/DataCache');
const ReceivePacket  = invoke('Server/Packet/Receive');
const Database       = invoke('Server/Database');

function createNewChar(session, buffer) {
    const packet = new ReceivePacket(buffer);

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
             name: packet.data[ 0],
             race: packet.data[ 1],
              sex: packet.data[ 2],
          classId: packet.data[ 3],
             hair: packet.data[10],
        hairColor: packet.data[11],
             face: packet.data[12],
    });
}

function consume(session, data) {
    Shared.fetchClassInformation(data.classId).then((classInfo) => {
        const points = classInfo.bornAt;
        const coords = points[utils.randomNumber(points.length)];

        data = {
            ...data, ...classInfo.vitals, ...coords
        };

        Database.createCharacter(session.accountId, data).then((packet) => {
            session.dataSend(
                ServerResponse.charCreateSuccess()
            );

            const charId = Number(packet.insertId);
            awardBaseSkills(charId, data.classId);
            awardBaseGear  (charId, data.classId);

            Shared.fetchCharacters(session.accountId).then((characters) => {
                Shared.enterCharacterHall(session, characters);
            });
        });
    });
}

function awardBaseSkills(id, classId) {
    const skills = DataCache.skillTree.find(ob => ob.classId === classId)?.skills;
    const level1 = skills?.filter(ob => ob.pLevel === 1);

    (level1 ?? []).forEach((skill) => {
        skill.passive = DataCache.skills.find(ob => ob.selfId === skill.selfId)?.template?.passive ?? false;
        Database.setSkill(skill, id);
    });
}

function awardBaseGear(id, classId) {
    const items = DataCache.itemsNewbie.find(ob => ob.classId === classId)?.items;

    (items ?? []).forEach((item) => {
        item.slot = DataCache.items.find(ob => ob.selfId === item.selfId)?.etc?.slot ?? 0;
        Database.setItem(item, id);
    });
}

module.exports = createNewChar;
