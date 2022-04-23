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

    toHex: () => {
        return Number(value).toString(16).padStart(padding, '0');
    }
};

module.exports = Utils;
