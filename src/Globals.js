// Override `require` for more convenient referrals
global.invoke = (module) => {
    return require(__dirname + '/' + module);
};

// Generic error method to terminate execution
global.fatalError = (...args) => {
    console.log.apply(this, args);
    process.exit();
};

require.extensions['.ini'] = (module, filename) => {
    module.exports = require('fs').readFileSync(filename, 'utf8');
};

// TODO: Not used
const State = {
    clients: new Set(),

    newClient: (socket) => {
        State.clients.add(socket);
    },

    removeClient: (socket) => {
        State.clients.delete(socket);
    },

    broadcast: (data) => {
        for (let socket of State.clients) {
            socket.write(data);
        }
    }
};

// Chronicle 0/1/2
// [0x5b,0x3b,0x27,0x2e,0x5d,0x39,0x34,0x2d,0x33,0x31,0x3d,0x3d,0x2d,0x25,0x26,0x40,0x21,0x5e,0x2b,0x5d]
// [;'.]94-31==-%&@!^+]\000

// Chronicle 4/5
// [0x5f,0x3b,0x35,0x2e,0x5d,0x39,0x34,0x2d,0x33,0x31,0x3d,0x3d,0x2d,0x25,0x78,0x54,0x21,0x5e,0x5b,0x24]
// _;5.]94-31==-%xT!^[$\000

// Chronicle 6 (Interlude)
// [0x6b,0x60,0xcb,0x5b,0x82,0xce,0x90,0xb1,0xcc,0x2b,0x6c,0x55,0x6c,0x6c,0x6c,0x6c]
// 6b60cb5b82ce90b1cc2b6c556c6c6c6c
