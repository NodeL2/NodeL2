let fs = require('fs');
let ini = require('ini');

class Config {
    static defaults = ini.parse(
        fs.readFileSync('./Config.ini', 'utf-8')
    );

    // static loginServer = {
    //     host: this.defaults.AuthServer.host
    // };

    static protocolVersion = 419;

    static loginServer = {
        host: '127.0.0.1',
        port: 2106
    };

    static gameServer = {
        host: '127.0.0.1',
        port: 7777
    };

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
