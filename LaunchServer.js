global.invoke = function(name) {
    return require(__dirname + '/src/' + name);
}

Array.prototype.isEqualTo = function(targetArray) {
    return (this.toString() === targetArray.toString());
};

global.NpcType = {
    NPC: 'npc',
    MONSTER: 'monster',
    ITEM: 'item'
};

let AuthServer = invoke('AuthServer/AuthServer');
let GameServer = invoke('GameServer/GameServer');

new AuthServer();
new GameServer();
