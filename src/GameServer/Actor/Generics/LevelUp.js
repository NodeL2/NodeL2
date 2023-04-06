const ServerResponse = invoke('GameServer/Network/Response');
const DataCache      = invoke('GameServer/DataCache');
const ConsoleText    = invoke('GameServer/ConsoleText');
const Database       = invoke('Database');

function levelUp(session, actor, nextLevel) {
    // Update stats
    actor.setLevel(nextLevel);
    invoke(path.actor).calculateStats(session, actor);
    actor.fillupVitals();

    const id      = actor.fetchId();
    const classId = actor.fetchClassId();
    const level   = actor.fetchLevel();
    const hp      = actor.fetchHp();
    const maxHp   = actor.fetchMaxHp();
    const mp      = actor.fetchMp();
    const maxMp   = actor.fetchMaxMp();

    // Stop automation to prevent false data
    actor.automation.stopReplenish();
    actor.automation.setRevHp(DataCache.revitalize.hp[level]);
    actor.automation.setRevMp(DataCache.revitalize.mp[level]);

    // Check for new skills
    actor.skillset.awardSkills(id, classId, level).then(() => {
        session.dataSend(ServerResponse.skillsList(actor.skillset.fetchSkills()));
    })

    // Level up effect
    session.dataSend(ServerResponse.socialAction(id, 15), actor);
    ConsoleText.transmit(session, ConsoleText.caption.levelUp);

    // Update database with new hp, mp
    Database.updateCharacterVitals(id, hp, maxHp, mp, maxMp);
}

module.exports = levelUp;
