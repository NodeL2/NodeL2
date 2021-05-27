let fs = require('fs');
let ini = require('ini');

class Config {
    static defaults = ini.parse(
        fs.readFileSync(__basedir + '/Config.ini', 'utf-8')
    );

    static loginServer = {
        host: this.defaults.AuthServer.host || '127.0.0.1',
        port: parseInt(this.defaults.AuthServer.port) || 2106
    };

    static gameServer = {
        host: this.defaults.GameServer.host || '127.0.0.1',
        port: parseInt(this.defaults.GameServer.port) || 7777
    };

    static protocolVersion = 419;

    static blowfishKey = '[;\'.]94-31==-%&@!^+]\u0000';

    static xorKey = [
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ];

    static sessionKey = [
        0x55555555,
        0x44444444,
    ];
}

module.exports = Config;
