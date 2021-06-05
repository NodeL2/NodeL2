global.invoke = function(name) {
    return require(__dirname + '/src/' + name);
}

Array.prototype.isEqualTo = function(targetArray) {
    return (this.toString() === targetArray.toString());
};

global.PacketType = {
    PROTOCOL_VER   : 0x00,
    MOVE_TO        : 0x01,
    ENTER_WORLD    : 0x03,
    ACTION         : 0x04,
    AUTH_LOGIN     : 0x08,
    LOGOUT         : 0x09,
    ATTACK         : 0x0a,
    CREATE_CHAR    : 0x0b,
    CHAR_SELECTED  : 0x0d,
    NEW_CHAR       : 0x0e,
    SHOW_INVENTORY : 0x0f,
    UNEQUIP        : 0x11,
    USE_ITEM       : 0x14,
    SOCIAL_ACTION  : 0x1b,
    ADD_SHORTCUT   : 0x33,
    STOP_MOVE      : 0x36,
    TARGET_CANCEL  : 0x37,
    SAY            : 0x38,
    ACTION_USE     : 0x45,
    RESTART        : 0x46,
    VALIDATE_POS   : 0x48,
    SHOW_BOARD     : 0x57,
    QUEST_LIST     : 0x63,
};

global.NpcType = {
    NPC     : 'npc',
    MONSTER : 'monster',
    ITEM    : 'item'
};

global.WearableItemType = {
    WEAPON : 'weapon',
    ARMOR  : 'armor'
};

let AuthServer = invoke('AuthServer/AuthServer');
let GameServer = invoke('GameServer/GameServer');

new AuthServer();
new GameServer();
