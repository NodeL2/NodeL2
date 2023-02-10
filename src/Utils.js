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

    parseRawFile: (filename, charset = 'utf8') => {
        return require('fs').readFileSync(filename, charset);
    },

    toHex: (value, padding = 2) => {
        return Number(value).toString(16).padStart(padding, '0');
    },

    randomNumber: (max) => {
        return Math.floor(Math.random() * max);
    },

    pad32Bits: (data) => {
        const size = data.length;
        const pad  = Buffer.alloc((Math.ceil(size / 4) * 4) - size);
        return Buffer.concat([data, pad]);
    }
};

module.exports = Utils;
