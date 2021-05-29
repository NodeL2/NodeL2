global.invoke = function(name) {
    return require(__dirname + '/src/' + name);
}

let AuthServer = invoke('AuthServer/AuthServer');
let GameServer = invoke('GameServer/GameServer');

new AuthServer();
new GameServer();
