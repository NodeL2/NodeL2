require('./Globals');

// User imports
const Config = invoke('Config');
const Utils  = invoke('Utils');

console.info('+ ==================================');
console.info('# Server Name: ......... NodeL2');
console.info('# Build Revision: ...... %s', Utils.buildNumber());
console.info('# Chronicle: ........... C2 [485]');
console.info('# Build date: .......... %s', Utils.currentDate());
console.info('# NodeJS version: ...... %s', Utils.nodeVersion());
console.info('+ ==================================\n');
