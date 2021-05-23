// User define
let Config = require('./Config');
let Blowfish = require('./Blowfish');
let ServerMethods = require('./ServerMethods');
let ClientMethods = require('./ClientMethods');

class ServerSession {
    constructor(socket) {
        this.socket = socket;
    }

    sendData(data, encrypt = true) {
        let header = new Buffer.from([data.length + 2, 0x00]);

        this.socket.write(
            Buffer.concat([header, encrypt ? Blowfish.encrypt(data) : data]) // encryptedPacket
        )
    }

    receiveData(data) {
        let decryptedPacket = Blowfish.decrypt(
            new Buffer.from(data, 'binary').slice(2)
        );

        // Opcodes
        switch (decryptedPacket[0]) {
            case 0x00:
                let credentials = ClientMethods.authorizeLogin(decryptedPacket);
                console.log(credentials);
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
