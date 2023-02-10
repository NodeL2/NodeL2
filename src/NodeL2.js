require('./Globals');

// User imports
const AuthSession = invoke('Server/Auth/Session');
const Database    = invoke('Database');
const Server      = invoke('Server');

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
    new Server('AuthServer', options.connection.AuthServer, (socket) => {
        return new AuthSession(socket);
    });
});
