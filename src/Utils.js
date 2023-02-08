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
    }
};

module.exports = Utils;
