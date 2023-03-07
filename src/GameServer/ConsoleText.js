const ServerResponse = invoke('GameServer/Network/Response');

const ConsoleText = {
    caption: {
        depletedMp        : 24,
        pickupAdenaAmount : 28,
        pickupAmountOf    : 29,
        pickup            : 30,
        welcome           : 34,
        actorHit          : 35,
        monsterHit        : 36,
        shootArrow        : 41,
        missedHit         : 43,
        criticalHit       : 44,
        used              : 46,
        equipped          : 49,
        earnedExpAndSp    : 95,
        levelUp           : 96,
    },

    kind: {
        number : 1,
        npc    : 2,
        item   : 3,
        skil   : 4,
    },

    transmit(session, textId, params = []) {
        session.dataSend(
            ServerResponse.consoleText(textId, params)
        );
    }
};

module.exports = ConsoleText;
