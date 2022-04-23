global.invoke = (module) => {
    return require(__dirname + '/' + module);
};

global.fatalError = (...args) => {
    console.log.apply(this, args);
    process.exit();
};

let AuthServer = invoke('AuthServer/AuthServer');
let Utils      = invoke('Utils');

console.log('# ================================');
console.log('# Server Name: ...... NodeL2 [768]');
console.log('# Build Revision: ... %s', Utils.buildNumber());
console.log('# Chronicle: ........ C4');
console.log('# Build date: ....... %s', Utils.currentDate());
console.log('# NodeJS version: ... %s', Utils.nodeVersion());
console.log('# ================================\n');

invoke('Database').init(() => {
    new AuthServer();
});

// Chronicle 0/1/2
// [0x5b,0x3b,0x27,0x2e,0x5d,0x39,0x34,0x2d,0x33,0x31,0x3d,0x3d,0x2d,0x25,0x26,0x40,0x21,0x5e,0x2b,0x5d]
// [;'.]94-31==-%&@!^+]\000

// Chronicle 4/5
// [0x5f,0x3b,0x35,0x2e,0x5d,0x39,0x34,0x2d,0x33,0x31,0x3d,0x3d,0x2d,0x25,0x78,0x54,0x21,0x5e,0x5b,0x24]
// _;5.]94-31==-%xT!^[$\000

// Chronicle 6 (Interlude)
// [0x6b,0x60,0xcb,0x5b,0x82,0xce,0x90,0xb1,0xcc,0x2b,0x6c,0x55,0x6c,0x6c,0x6c,0x6c]
// k`Ë[‚Î±Ì+lUllllk\000

let crypto = require('crypto');

let keyPair = crypto.generateKeyPairSync('rsa', { modulusLength: 1024 });
let publicKey = keyPair.publicKey.export({ type: 'pkcs1', format: 'der' });
console.log(publicKey.byteLength);
let privateKey = keyPair.privateKey.export({ type: 'pkcs1', format: 'der'});
console.log(privateKey.byteLength);

// crypto.generateKeyPair('rsa', {
//          modulusLength: 1024,
//      publicKeyEncoding: { type:  'spki', format: 'pem' },
//     privateKeyEncoding: { type: 'pkcs8', format: 'pem' },

// }, (error, public, private) => {
//     // const encrypted = crypto. publicEncrypt( public, Buffer.from('Hello suckers!'));
//     // const decrypted = crypto.privateDecrypt(private, encrypted);
    
//     // console.log(decrypted.toString('utf8'));
// });
