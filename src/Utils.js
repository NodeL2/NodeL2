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

    toHex: (value, padding) => {
        return Number(value).toString(16).padStart(padding, '0');
    },

    dumpBuffer: (array) => {
        console.log(array.toString('hex').match(/../g).join(' '));
        console.log('\n');
    },

    toAsciiStripNull: (value) => {
        return value.toString().replace(/\u0000/gi, '');
    }
};

module.exports = Utils;
