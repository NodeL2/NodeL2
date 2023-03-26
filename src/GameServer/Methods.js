const ServerResponse = invoke('GameServer/Network/Response');
const DataCache      = invoke('GameServer/DataCache');
const ConsoleText    = invoke('GameServer/ConsoleText');
const Database       = invoke('Database');

const Methods = {
    expAndSpReward(session, actor, exp, sp) {
        const optn = options.default.General;

        let totalExp = actor.fetchExp() + (exp *= optn.expRate);
        let totalSp  = actor.fetchSp () + ( sp *= optn.expRate);

        actor.setExpSp(totalExp, totalSp);
        ConsoleText.transmit(session, ConsoleText.caption.earnedExpAndSp, [{ kind: ConsoleText.kind.number, value: exp }, { kind: ConsoleText.kind.number, value: sp }]);

        for (let i = 0; i < 75; i++) {
            if (totalExp >= DataCache.experience[i] && totalExp < DataCache.experience[i + 1]) {
                if (i + 1 > actor.fetchLevel()) { // Leveled up
                    Methods.levelUp(session, actor, i + 1);
                    break;
                }
            }
        }

        // Update stats
        session.dataSend(ServerResponse.userInfo(actor));

        // Update database with new exp, sp
        Database.updateCharacterExperience(actor.fetchId(), actor.fetchLevel(), totalExp, totalSp);
    },

    levelUp(session, actor, nextLevel) {
        // Update stats
        actor.setLevel(nextLevel);
        actor.setCollectiveAll();
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
        session.dataSend(ServerResponse.socialAction(id, 15));
        ConsoleText.transmit(session, ConsoleText.caption.levelUp);

        // Update database with new hp, mp
        Database.updateCharacterVitals(id, hp, maxHp, mp, maxMp);
    }
};

module.exports = Methods;
