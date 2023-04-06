const ServerResponse = invoke('GameServer/Network/Response');
const Shared         = invoke('GameServer/Network/Shared');
const DataCache      = invoke('GameServer/DataCache');
const ReceivePacket  = invoke('Packet/Receive');
const Database       = invoke('Database');

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
    Database.fetchCharacterName(data.name).then((rows) => {
        if (rows[0]) {
            session.dataSendToMe(
                ServerResponse.charCreateFail(0x02)
            );
        }
        else {
            Shared.fetchClassInformation(data.classId).then((classInfo) => {
                const spawns = fetchSpawnPoints(data.classId);
                const coords = spawns[utils.randomNumber(utils.size(spawns))];
        
                data = {
                    ...data, ...classInfo.vitals, ...coords
                };
        
                Database.createCharacter(session.accountId, data).then((packet) => {
                    session.dataSendToMe(
                        ServerResponse.charCreateSuccess()
                    );
        
                    const charId = Number(packet.insertId);
                    awardBaseSkills   (charId, data.classId);
                    awardBaseGear     (charId, data.classId);
                    awardBaseShortcuts(charId, data.classId);
        
                    Shared.fetchCharacters(session.accountId).then((characters) => {
                        Shared.enterCharacterHall(session, characters);
                    });
                });
            });
        }
    });
}

function fetchSpawnPoints(classId) {
    return DataCache.newbieSpawns.find(ob => ob.classId === classId)?.spawns;
}

function awardBaseSkills(id, classId) {
    DataCache.fetchSkillTreeFromClassId(classId, (skillTree) => {
        const skills = skillTree.skills;
        const level1 = skills?.filter((ob) => ob.levels.find((ob) => ob.pLevel === 1)) ?? [];

        level1.forEach((skill) => {
            skill.levels = skill.levels.filter((ob) => ob.pLevel === 1);
            DataCache.fetchSkillFromSelfId(skill.selfId, (skillDetails) => {
                skill = { ...utils.crushOb(skill), passive: skillDetails.template?.passive ?? false };
                Database.setSkill(skill, id);
            });
        });
    });
}

function awardBaseGear(id, classId) {
    const items = DataCache.newbieItems.find(ob => ob.classId === classId)?.items;

    (items ?? []).forEach((item) => {
        item.slot = DataCache.items.find(ob => ob.selfId === item.selfId)?.etc?.slot ?? 0;
        Database.setItem(id, item);
    });
}

function awardBaseShortcuts(id, classId) {
    const shortcuts = DataCache.newbieShortcuts.find((ob) => ob.classId === classId)?.shortcuts ?? [];
    shortcuts.forEach((shortcut) => {
        Database.setShortcut(id, shortcut);
    });
}

module.exports = createNewChar;
