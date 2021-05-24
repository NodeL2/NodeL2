// User define
let Config = require('./Config');
let Blowfish = require('./Blowfish');
let AuthServerMethods = require('./AuthServerMethods');
let AuthClientMethods = require('./AuthClientMethods');
let Utils = require('./Utils');

class AuthServerSession {
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
            case 0x00: // Authorize Login
                {
                    let data = AuthClientMethods.authorizeLogin(decryptedPacket);

                    if (true) {
                        this.sendData(AuthServerMethods.loginSuccess());
                    } else {
                        // 0x01 System error
                        // 0x02 Password does not match this account
                        // 0x04 Access failed
                        // 0x07 The account is already in use
                        this.sendData(AuthServerMethods.loginFail(0x01));
                    }
                }
                break;

            case 0x05: // Server List
                {
                    let data = AuthClientMethods.serverList(decryptedPacket);

                    if (Config.sessionKey.toString() === data.sessionKey.toString()) {
                        this.sendData(AuthServerMethods.serverList(Config.gameServer.host, Config.gameServer.port));
                    }
                }
                break;

            case 0x02: // Game Login
                {
                    let data = AuthClientMethods.gameLogin(decryptedPacket);

                    if (Config.sessionKey.toString() === data.sessionKey.toString()) {
                        if (true) {
                            this.sendData(AuthServerMethods.playOk(Config.sessionKey));
                        } else {
                            // 0x01 System error
                            // 0x02 Password does not match this account
                            // 0x04 Access failed
                            // 0x07 The account is already in use
                            this.sendData(AuthServerMethods.playFail(0x01));
                        }
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

module.exports = AuthServerSession;
