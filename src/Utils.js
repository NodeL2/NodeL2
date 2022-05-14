const Utils = {
    currentDate: () => {
        return new Date().toISOString().slice(0, 10);
    },

    nodeVersion: () => {
        return process.versions.node;
    },

    buildNumber: () => {
        return require('../package').version;
    },

    toHex: (value, padding = 2) => {
        return Number(value).toString(16).padStart(padding, '0');
    },

    randomNumber: (max) => {
        return Math.floor(Math.random() * max);
    },

    isAlphaNumeric: (string) => {
        return /^[A-Za-z0-9]*$/.test(string);
    },

    stripNull: (value) => {
        return value.replace(/\u0000/gi, '');
    },

    pad32Bits: (data) => {
        const size = data.length;
        const pad  = Buffer.alloc((Math.ceil(size / 4) * 4) - size);
        return Buffer.concat([data, pad]);
    },

    dumpBuffer: (array) => {
        console.log('%s\n\n', array.toString('hex').match(/../g).join(' '));
    },

    matchSessionKeys: (pair1, pair2) => {
        return (pair1.sessionKey1 === pair2.sessionKey1) && (pair1.sessionKey2 === pair2.sessionKey2);
    },

    fetchIPv4Address: () => {
        let network = require('os').networkInterfaces();
        let ipv4 = network['en0'].filter(item => item.family === 'IPv4');
        return ipv4[0].address;
    },

    parseRawFile: (filename, charset = 'utf8') => {
        return require('fs').readFileSync(filename, charset);
    },

    totalMemUsed: () => {
        console.log('NodeL2:: Total Mem Used -> %f MB', Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100);
    }
};

module.exports = Utils;
