const ServerResponse = invoke('GameServer/Network/Response');

const ConsoleText = {
    NOT_ENOUGH_MP                   : 24,
    YOU_PICKED_UP_S1_ADENA          : 28,
    YOU_PICKED_UP_S1_S2             : 29,
    YOU_PICKED_UP_S1                : 30,
    WELCOME_TO_LINEAGE              : 34,
    YOU_DID_S1_DMG                  : 35,
    S1_GAVE_YOU_S2_DMG              : 36,
    GETTING_READY_TO_SHOOT_AN_ARROW : 41,
    MISSED_TARGET                   : 43,
    CRITICAL_HIT                    : 44,
    USE_S1                          : 46,
    S1_EQUIPPED                     : 49,
    YOU_EARNED_S1_EXP_AND_S2_SP     : 95,
    YOU_INCREASED_YOUR_LEVEL        : 96,

    transmit(session, content, parameters) {
        session.dataSend(
            ServerResponse.consoleText(content, parameters)
        );
    }
};

module.exports = ConsoleText;
