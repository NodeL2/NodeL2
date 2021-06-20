global.invoke = (module) => {
    return require(__dirname + '/' + module);
};

global.ChronicleVersion = {
    C1: 1,
    C2: 2,
    C3: 3,
};

let Config     = invoke('Config');
let Database   = invoke('Database');
let AuthServer = invoke('AuthServer/AuthServer');
let GameServer = invoke('GameServer/GameServer');

Database.init(Config.database, () => {
    new AuthServer(Config.authServer);
    new GameServer(Config.gameServer);
});
