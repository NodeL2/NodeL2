require('./Globals');

// User imports

let AuthSession = require('@Auth/Session');
let GameSession = require('@Game/Session');
let Config      = require('@Config');
let Database    = require('@Database');
let Server      = require('@Server');
let Utils       = require('@Utils');

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
