// Override `require` for more convenient referrals
global.invoke = (module) => {
    return require(__dirname + '/' + module);
};

// Generic error method to warn user
global.infoWarn = (...params) => {
    console.info('\x1b[33m' + require('util').format(...params) + '\x1b[0m');
};

// Generic error method to terminate execution
global.infoFail = (...params) => {
    console.info('\x1b[31m' + require('util').format(...params) + '\x1b[0m');
    process.exit();
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
        for (const socket of State.clients) {
            socket.write(data);
        }
    }
};
