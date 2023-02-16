require('./Globals');

// User imports
const AuthSession = invoke('Server/Auth/Session');
const GameSession = invoke('Server/Game/Session');
const DataCache   = invoke('Server/Game/DataCache');
const Database    = invoke('Server/Database');
const Server      = invoke('Server/Server');

console.info('\n\
    + ================================== \n\
    # Server Name: ......... NodeL2      \n\
    # Build Revision: ...... %s          \n\
    # Chronicle: ........... C2 [485]    \n\
    # Build date: .......... %s          \n\
    # NodeJS version: ...... %s          \n\
    + ================================== \n\
', utils.buildNumber(), utils.currentDate(), utils.nodeVersion());

// Startup procedure, first `Database`, then `AuthServer`, finally `GameServer`
Database.init(() => {
    DataCache.init();

    new Server('AuthServer', options.connection.AuthServer, (socket) => {
        return new AuthSession(socket);
    });

    new Server('GameServer', options.connection.GameServer, (socket) => {
        return new GameSession(socket);
    });
});

//var dude = 0;
//
//function hello() {
//    console.info('hi ' + dude);
//    dude++;
//}
//
//function hello2() {
//    return new Promise((success) => {
//        console.info('hi ' + dude);
//        dude++;
//        success(dude);
//    });
//}
//
//let ids = [1, 2, 3];
//
//ids.reduce((previous, nextId) => {
//    return previous.then(() => {
//        return hello2(nextId);
//    });
//}, Promise.resolve());
