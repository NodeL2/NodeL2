let Blowfish      = invoke('AuthServer/Blowfish');
let ClientRequest = invoke('AuthServer/Request');
let Utils         = invoke('Utils');

class Session {
    constructor(socket) {
        this.socket = socket;
    }

    receiveData(data) {
        let decryptedPacket = Blowfish.decrypt(
            Buffer.from(data).slice(2)
        );

        // Opcodes
        switch (decryptedPacket[0]) {
            case 0x00:
                ClientRequest.authoriseLogin(this, decryptedPacket);
                break;

            default:
                console.log('AuthServer:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
                break;
        }
    }

    sendData(data, encrypt = true) {
        let header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);

        this.socket.write(
            Buffer.concat([header, encrypt ? Blowfish.encrypt(data) : data])
        );
    }
}

module.exports = Session;
