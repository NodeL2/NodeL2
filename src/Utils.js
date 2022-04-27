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
        console.log('%s\n', array.toString('hex').match(/../g).join(' '));
    },

    stripNull: (value) => {
        return value.replace(/\u0000/gi, '');
    },

    matchSessionKeys: (pair1, pair2) => {
        return (pair1.sessionKey1 === pair2.sessionKey1) && (pair1.sessionKey2 === pair2.sessionKey2);
    }
};

module.exports = Utils;
