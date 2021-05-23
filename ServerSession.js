let crypto = require('crypto');

// User define
let Config = require('./Config');
let ServerMethods = require('./ServerMethods');
let ClientMethods = require('./ClientMethods');

class ServerSession {
    constructor(socket) {
        this.socket = socket;
    }

    sendData(data, encrypt = true) {
        let header = new Buffer.from([data.length + 2, 0x00]);

        if (encrypt) {
            let cipher = crypto.createCipheriv('bf-ecb', Config.blowfishKey, '');
            cipher.setAutoPadding(false);
            data = cipher.update((new Buffer.from(data)).swap32());

            this.socket.write(
                Buffer.concat([header, data.swap32()]) // Packet
            );
        }
        else {
            this.socket.write(
                Buffer.concat([header, data]) // Packet
            );
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
                let credentials = ClientMethods.authorizeLogin(packet);
                console.log(credentials);
                // Check user
                this.sendData(ServerMethods.loginSuccess());
                break;

            case 0x05:
                console.log('LS:: request Server List');
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
        console.log('LS:: connection %s error: %s', this.socket.remoteAddress, error.message);
    }
}

module.exports = ServerSession;
