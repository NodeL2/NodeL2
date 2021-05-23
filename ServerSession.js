let crypto = require('crypto');

// User define
let Config = require('./Config');
let ClientMethods = require('./ClientMethods');

class ServerSession {
    constructor(socket) {
        this.socket = socket;
    }

    sendData(data, encrypt = true) {
        let header = new Buffer.from([data.length + 2, 0x00]);

        if (encrypt) {
            console.log('Encryption failed');
        }
        else {
            let packet = Buffer.concat([header, data]);
            this.socket.write(packet);
        }
    }

    receiveData(data) {
        let packet = new Buffer.from(data, 'binary').slice(2).swap32();
        let decipher = crypto.createDecipheriv('bf-ecb', Config.blowfishKey, '');
        decipher.setAutoPadding(false);
        packet = Buffer.concat([decipher.update(packet), decipher.final()]).swap32();

        let opcode = packet[0];

        switch (opcode) {
            case 0x00:
                let hi = ClientMethods.authorizeLogin(packet);
                console.log(hi);
                break;

            default:
                console.log('LS:: unknown opcode 0x%s', Number(opcode).toString(16).padStart(2, '0'));
                break;
        }
    }

    connectionClosed() {
        console.log('LS:: connection from %s:%s closed', this.socket.remoteAddress, this.socket.remotePort);
    }

    connectionError(error) {
        console.log('Connection %s error: %s', this.socket.remoteAddress, error.message);
    }
}

module.exports = ServerSession;
