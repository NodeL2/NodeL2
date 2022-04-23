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
        console.dir(array, {
            colors: true, depth: null, maxArrayLength: null
        });
    }
};

module.exports = Utils;
