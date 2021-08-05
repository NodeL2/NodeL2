global.invoke = (module) => {
    return require(__dirname + '/' + module);
};

let Config     = invoke('Config');
let Database   = invoke('Database');
let AuthServer = invoke('AuthServer/AuthServer');
let GameServer = invoke('GameServer/GameServer');

Database.init(Config.database, () => {
    new AuthServer(Config.authServer);
    new GameServer(Config.gameServer);
});
