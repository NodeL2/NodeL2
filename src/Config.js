// Module imports
let fs = require('fs'), ini = require('ini');

class Config {
    static defaults = ini.parse(
        fs.readFileSync('./config.ini', 'utf-8')
    );

    static database = {
        host     : this.defaults.Database.Hostname         || '127.0.0.1',
        port     : parseInt(this.defaults.Database.Port)   || 3306,
        user     : this.defaults.Database.User             || 'root',
        password : this.defaults.Database.Password         || 'root',
        db       : this.defaults.Database.Name             || 'nodel2'
    };

    static authServer = {
        host     : this.defaults.AuthServer.Hostname       || '127.0.0.1',
        port     : parseInt(this.defaults.AuthServer.Port) || 2106
    };

    static gameServer = {
        host     : this.defaults.GameServer.Hostname       || '127.0.0.1',
        port     : parseInt(this.defaults.GameServer.Port) || 7777
    };
}

module.exports = Config;
