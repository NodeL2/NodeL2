require('./Globals');

// User imports
const AuthSession = invoke('Server/Auth/Session');
const GameSession = invoke('Server/Game/Session');
const Config      = invoke('Config');
const Database    = invoke('Database');
const Server      = invoke('Server');
const Utils       = invoke('Utils');

console.info('# ==================================');
console.info('# Server Name: ........ NodeL2 [468]');
console.info('# Build Revision: ..... %s', Utils.buildNumber());
console.info('# Chronicle: .......... Classic 1.5');
console.info('# Build date: ......... %s', Utils.currentDate());
console.info('# NodeJS version: ..... %s', Utils.nodeVersion());
console.info('# ==================================\n');

// Startup procedure, first `Database`, then `AuthServer`, finally `GameServer`
Database.init(() => {
    new Server('AuthServer', Config.authServer, (socket) => { return new AuthSession(socket); });
    new Server('GameServer', Config.gameServer, (socket) => { return new GameSession(socket); });
});
