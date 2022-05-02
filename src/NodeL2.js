require('./Globals');

// User imports

let AuthSession = invoke('Server/Auth/Session');
let GameSession = invoke('Server/Game/Session');
let Config      = invoke('Config');
let Database    = invoke('Database');
let Server      = invoke('Server');
let Utils       = invoke('Utils');

console.log('# ================================');
console.log('# Server Name: ...... NodeL2 [768]');
console.log('# Build Revision: ... %s', Utils.buildNumber());
console.log('# Chronicle: ........ C4');
console.log('# Build date: ....... %s', Utils.currentDate());
console.log('# NodeJS version: ... %s', Utils.nodeVersion());
console.log('# ================================\n');

// Startup procedure, first `Database`, then `AuthServer`, finally `GameServer`

Database.init(() => {
    new Server('AuthServer', Config.authServer, (socket) => { return new AuthSession(socket); });
    new Server('GameServer', Config.gameServer, (socket) => { return new GameSession(socket); });
});
