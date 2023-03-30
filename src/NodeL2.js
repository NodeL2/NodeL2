require('./Global');

// User imports
const AuthSession = invoke('AuthenticationServer/Session');
const GameSession = invoke('GameServer/Session');
const World       = invoke('GameServer/World/World');
const DataCache   = invoke('GameServer/DataCache');
const Database    = invoke('Database');
const Server      = invoke('Server');

//console.info('\n\
//    + ================================== \n\
//    # Server Name: ......... NodeL2      \n\
//    # Build Revision: ...... %s          \n\
//    # Chronicle: ........... C2 [485]    \n\
//    # Build date: .......... %s          \n\
//    # NodeJS version: ...... %s          \n\
//    + ================================== \n\
//', utils.buildNumber(), utils.currentDate(), utils.nodeVersion());
//
//// Startup procedure, init `World` & `Data`, then `AuthServer`, finally `GameServer`
//Database.init(() => {
//    DataCache.init();
//        World.init();
//
//    new Server('AuthServer', options.default.AuthServer, (socket) => {
//        return new AuthSession(socket);
//    });
//
//    new Server('GameServer', options.default.GameServer, (socket) => {
//        return new GameSession(socket);
//    });
//});

let spawns = require('./spawns');
let names = require('./names');

for (let spawn of spawns) {
    const inside = spawn.spawns;
    if (!inside) {
        console.log('0');
    }
    else {
        for (let one of inside) {
            const found = names.find(ob => ob.selfId === one.selfId);
            if (!found) {
                console.log(one.selfId);
            }
            else {
                one.name = found.name;
            }
        }
    }
}

require('fs').writeFile('output.json', JSON.stringify(spawns), 'utf8', () => {});
