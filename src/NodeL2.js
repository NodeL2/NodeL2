require('./Globals');

// User imports
const AuthSession = invoke('AuthSession');
const Config      = invoke('Config');
const Database    = invoke('Database');
const Server      = invoke('Server');
const Utils       = invoke('Utils');

console.info('\n\
    + ================================== \n\
    # Server Name: ......... NodeL2      \n\
    # Build Revision: ...... %s          \n\
    # Chronicle: ........... C2 [485]    \n\
    # Build date: .......... %s          \n\
    # NodeJS version: ...... %s          \n\
    + ================================== \n\
', Utils.buildNumber(), Utils.currentDate(), Utils.nodeVersion());

// Startup procedure, first `Database`, then `AuthServer`, finally `GameServer`
Database.init(() => {
    new Server('AuthServer', Config.AuthServer, (socket) => { return new AuthSession(socket); });
});
