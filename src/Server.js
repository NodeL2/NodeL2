global.invoke = (module) => {
    return require(__dirname + '/' + module);
};

let AuthServer = invoke('AuthServer/AuthServer');
let { buildNumber, currentDate, nodeVersion } = invoke('Utils');

console.log('# ================================');
console.log('# Server Name: ...... NodeL2 [768]');
console.log('# Build Revision: ... %s', buildNumber());
console.log('# Chronicle: ........ C6');
console.log('# Build date: ....... %s', currentDate());
console.log('# NodeJS version: ... %s', nodeVersion());
console.log('# ================================\n');

invoke('Database').initDatabase(() => {
    new AuthServer();
});
