// User define
let Config = require(__basedir + '/src/Config');
let Database = require(__basedir + '/src/Database');
let Blowfish = require(__basedir + '/src/Blowfish');
let AuthServerMethods = require(__basedir + '/src/AuthServer/AuthServerMethods');
let AuthClientMethods = require(__basedir + '/src/AuthServer/AuthClientMethods');
let Utils = require(__basedir + '/src/Utils');

Array.prototype.isEqualTo = function(targetArray) {
    return (this.toString() === targetArray.toString());
};

class AuthServerSession {
    constructor(socket) {
        this.socket = socket;
    }

    sendData(data, encrypt = true) {
        let header = new Buffer.from([0x00, 0x00]);
        header.writeInt16LE(data.length + 2);

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
                AuthClientMethods.authorizeLogin(decryptedPacket)
                    .then((data) => {

                        Database.getAccountPassword(data.username)
                            .then((rows) => {

                                if (rows[0]?.password === data.password) {
                                    this.sendData(AuthServerMethods.loginSuccess());
                                }
                                else {
                                    // 0x01 System error
                                    // 0x02 Password does not match this account
                                    // 0x04 Access failed
                                    // 0x07 The account is already in use
                                    this.sendData(AuthServerMethods.loginFail(0x02));
                                }
                            });
                    });
                break;

            case 0x02: // Game Login
                AuthClientMethods.gameLogin(decryptedPacket)
                    .then((data) => {

                        if (data.sessionKey.isEqualTo(Config.sessionKey)) {
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
                    });
                break;

            case 0x05: // Server List
                AuthClientMethods.serverList(decryptedPacket)
                    .then((data) => {

                        if (data.sessionKey.isEqualTo(Config.sessionKey)) {
                            this.sendData(AuthServerMethods.serverList(Config.gameServer.host, Config.gameServer.port));
                        }
                    });
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
