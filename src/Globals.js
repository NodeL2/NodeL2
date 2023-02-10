// Override `require` for more convenient referrals
global.invoke = (module) => {
    return require(__dirname + '/' + module);
};

global.utils = {
    infoSuccess: (...params) => {
        console.info('\x1b[32m' + require('util').format(...params) + '\x1b[0m');
    },

    infoAlert: (...params) => {
        console.info('\x1b[33m' + require('util').format(...params) + '\x1b[0m');
    },

    infoFail: (...params) => {
        console.info('\x1b[31m' + require('util').format(...params) + '\x1b[0m');
        process.exit();
    },

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

global.options = {
    connection: require('js-ini').parse(
        utils.parseRawFile('./config/connection.ini')
    )
};
