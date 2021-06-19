global.invoke = function(module) {
    return require(__dirname + '/' + module);
}

let AuthServer = invoke('AuthServer/AuthServer');
let GameServer = invoke('GameServer/GameServer');

new AuthServer();
new GameServer();
