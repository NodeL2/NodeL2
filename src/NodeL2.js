require('./Globals');

// User imports
const AuthServer = invoke('AuthServer');
const Config     = invoke('Config');
const Database   = invoke('Database');
const Utils      = invoke('Utils');

console.info('\n\
    + ================================== \n\
    # Server Name: ......... NodeL2      \n\
    # Build Revision: ...... %s          \n\
    # Chronicle: ........... C2 [485]    \n\
    # Build date: .......... %s          \n\
    # NodeJS version: ...... %s          \n\
    + ================================== \n\
', Utils.buildNumber(), Utils.currentDate(), Utils.nodeVersion());

Database.init(Config.Database, () => {
    new AuthServer(Config.AuthServer);
});
