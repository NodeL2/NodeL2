let GameServerResponse = invoke('GameServer/GameServerResponse');

global.ShortcutType = {
    ITEM   : 1,
    SKILL  : 2,
    ACTION : 3,
}

class Shortcuts {
    static add(session, data) {
        switch (data.type) {
            case ShortcutType.ITEM:
            case ShortcutType.ACTION:
                session.sendData(
                    GameServerResponse.addShortcutOk(data)
                );
                break;

            case ShortcutType.SKILL:
                console.log('GS:: unknown shortcut %d', data.type);
                break;
        }
    }

    static remove(session, data) {
    }
}

module.exports = Shortcuts;
