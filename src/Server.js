global.invoke = function(module) {
    return require(__dirname + '/' + module);
}

let Database   = invoke('Database');
let AuthServer = invoke('AuthServer/AuthServer');
let GameServer = invoke('GameServer/GameServer');

Database.init(() => {
    new AuthServer();
    new GameServer();
});
