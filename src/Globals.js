// Override `require` for more convenient referrals
global.invoke = (module) => {
    return require(__dirname + '/' + module);
};

// Generic success prompt
global.infoSuccess = (...params) => {
    console.info('\x1b[32m' + require('util').format(...params) + '\x1b[0m');
};

// Generic error, terminates execution
global.infoFail = (...params) => {
    console.info('\x1b[31m' + require('util').format(...params) + '\x1b[0m');
    process.exit();
};
