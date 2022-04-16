global.invoke = (module) => {
    return require(__dirname + '/' + module);
};

global.fatalError = (...args) => {
    console.log.apply(this, args);
    process.exit();
}

let Database   = invoke('Database');
let AuthServer = invoke('AuthServer/AuthServer');
let GameServer = invoke('GameServer/GameServer');

console.log('# ====================================');
console.log('# Server Name: ...... NodeL2 [768]');
console.log('# Build Revision: ... 0.02');
console.log('# Chronicle: ........ C1');
console.log('# Build date: ....... 2022.04.15 17:48');
console.log('# NodeJS version: ... 14.17.x');
console.log('# ====================================\n');

Database.init(invoke('Config').database, () => {
    new AuthServer();
    new GameServer();
});
