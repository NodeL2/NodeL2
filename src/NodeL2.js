require('./Globals');

// User imports
const AuthSession = invoke('Server/Auth/Session');
const GameSession = invoke('Server/Game/Session');
const World       = invoke('Server/Game/World');
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

// Startup procedure, init `World` & `Data`, then `AuthServer`, finally `GameServer`
Database.init(() => {
    DataCache.init();
        World.init();

    new Server('AuthServer', options.connection.AuthServer, (socket) => {
        return new AuthSession(socket);
    });

    new Server('GameServer', options.connection.GameServer, (socket) => {
        return new GameSession(socket);
    });
});

// A cool alternative to stupid hardcoded tables
function fetchSTRMod(str) {
    let base = 0.30;
    let multiplier = 0.036219821012;
    for (let i = 1; i < str; i++, base += (base * multiplier));
    return Number(base.toFixed(2));
}

console.info(fetchSTRMod(50));

//pAtk = weapon_pAtk * STR
//hit = 77 * (pAtk + power) / (pDef)
