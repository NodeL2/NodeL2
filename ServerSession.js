// User define
let Config = require('./Config');
let Blowfish = require('./Blowfish');
let ServerMethods = require('./ServerMethods');
let ClientMethods = require('./ClientMethods');
let Utils = require('./Utils');

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
                {
                    let data = ClientMethods.authorizeLogin(decryptedPacket);
                    this.sendData(ServerMethods.loginSuccess());
                }
                break;

            case 0x05:
                {
                    let data = ClientMethods.serverList(decryptedPacket);

                    if (Config.sessionKey.toString() === data.sessionKey.toString()) {
                        console.log('LS:: send Server List');
                    }
                }
                break;

            default:
                console.log('LS:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
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
