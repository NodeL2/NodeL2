let ini = require('ini').parse(
    require('fs').readFileSync('./config.ini', 'utf-8')
);

const optnDatabase = {
    hostname :   (ini.Database.Hostname   ?? '127.0.0.1'),
    port     : + (ini.Database.Port       ?? '3306'),
    user     :   (ini.Database.User       ?? 'root'),
    password :   (ini.Database.Password   ?? ''),
    name     :   (ini.Database.Name       ?? 'nodel2')
};

const optnAuthServer = {
    hostname :   (ini.AuthServer.Hostname ?? '127.0.0.1'),
    port     : + (ini.AuthServer.Port     ?? '2106')
};

exports.optnDatabase   = optnDatabase;
exports.optnAuthServer = optnAuthServer;
