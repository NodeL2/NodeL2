// User define
let Config = require('./Config');
let GameClientMethods = require('./GameClientMethods');
let Utils = require('./Utils');

class GameServerSession {
    constructor(socket) {
        this.socket = socket;
    }

    receiveData(data) {
        let packet = new Buffer.from(data, 'binary').slice(2);

        // Opcodes
        switch (packet[0]) {
            case 0x00:
                {
                    let data = GameClientMethods.protocolVersion(packet);

                    if (Config.protocolVersion === data.protocolVersion) {
                        // CryptInit?
                    }
                }
                break;

            default:
                console.log('GS:: unknown opcode 0x%s', Utils.toHex(packet[0], 2));
                break;
        }
    }
}

module.exports = GameServerSession;
