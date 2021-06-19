// Module imports
let fs = require('fs'), ini = require('ini');

class Config {
    static ini = ini.parse(
        fs.readFileSync('./config.ini', 'utf-8')
    );

    static database = {
        host     :  this.ini.Database.Hostname   ?? '127.0.0.1',
        port     : +this.ini.Database.Port       ?? 3306,
        user     :  this.ini.Database.User       ?? 'root',
        password :  this.ini.Database.Password   ?? '',
        db       :  this.ini.Database.Name       ?? 'nodel2'
    };

    static authServer = {
        host     :  this.ini.AuthServer.Hostname ?? '127.0.0.1',
        port     : +this.ini.AuthServer.Port     ?? 2106
    };

    static gameServer = {
        host     :  this.ini.GameServer.Hostname ?? '127.0.0.1',
        port     : +this.ini.GameServer.Port     ?? 7777
    };
}

module.exports = Config;
