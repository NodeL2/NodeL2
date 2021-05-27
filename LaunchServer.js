global.__basedir = __dirname;

let AuthServer = require(__basedir + '/src/AuthServer/AuthServer');
let GameServer = require(__basedir + '/src/GameServer/GameServer');

new AuthServer();
new GameServer();
