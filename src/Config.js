const ini = require('ini').parse(
    invoke('Utils').parseRawFile('./config/server.ini')
);

// Default values appropriate for L2 Chronicle 2 client
const Config = {
    authServer: {
        hostname :   (ini.AuthServer.Hostname ?? '127.0.0.1'),
        port     : + (ini.AuthServer.Port     ?? '2106')
    },

    gameServer: {
        hostname :   (ini.GameServer.Hostname ?? '127.0.0.1'),
        port     : + (ini.GameServer.Port     ?? '7777')
    }
};

module.exports = Config;
