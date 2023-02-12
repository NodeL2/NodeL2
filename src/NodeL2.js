require('./Globals');

// User imports
const AuthSession = invoke('Server/Auth/Session');
const GameSession = invoke('Server/Game/Session');
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

    new Server('GameServer', options.connection.GameServer, (socket) => {
        return new GameSession(socket);
    });
});

//const jsonSchema = require('jsonschema');
//const model = require('../data/Templates/0-human-fighter.json');
//let result = jsonSchema.validate(model, require('../data/Templates/schema.json'));
//console.info(result.valid);
