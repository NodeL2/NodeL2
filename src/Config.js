const ini = require('ini').parse(
    require('fs').readFileSync('./config.ini', 'utf-8')
);

const Config = {
    database: {
        hostname    :   (ini.Database.Hostname      ?? '127.0.0.1'),
        port        : + (ini.Database.Port          ?? '3306'),
        user        :   (ini.Database.User          ?? 'root'),
        password    :   (ini.Database.Password      ?? ''),
        name        :   (ini.Database.Name          ?? 'nodel2')
    },

    authServer: {
        hostname    :   (ini.AuthServer.Hostname    ?? '127.0.0.1'),
        port        : + (ini.AuthServer.Port        ?? '2106'),
        protocol    : + (ini.AuthServer.Protocol    ?? '0x785a'),
        blowfishKey :   (ini.AuthServer.blowfishKey ?? '_;5.]94-31==-%xT!^[$'),
        autoCreate  :   (ini.AuthServer.Autocreate  ?? true)
    },

    client: {
        sessionKey1 : + (ini.Client.SessionKey1     ?? '0x55555555'),
        sessionKey2 : + (ini.Client.SessionKey2     ?? '0x44444444')
    }
};

module.exports = Config;
