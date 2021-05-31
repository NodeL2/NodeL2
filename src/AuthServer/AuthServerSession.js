// User define
let AuthClientRequest = invoke('AuthServer/AuthClientRequest');
let Blowfish = invoke('Blowfish');
let Config = invoke('Config');
let Database = invoke('Database');
let Utils = invoke('Utils');

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
                AuthClientRequest.authorizeLogin(this, decryptedPacket);
                break;

            case 0x02: // Game Login
                AuthClientRequest.gameLogin(this, decryptedPacket);
                break;

            case 0x05: // Server List
                AuthClientRequest.serverList(this, decryptedPacket);
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
