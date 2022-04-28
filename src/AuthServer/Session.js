let Blowfish       = invoke('Cipher/Blowfish');
let ClientRequest  = invoke('AuthServer/Request');
let ServerResponse = invoke('AuthServer/Response');
let Opcodes        = invoke('AuthServer/Opcodes');
let Utils          = invoke('Utils');

class Session {
    constructor(socket) {
        this.socket = socket;

        // First handshake with client
        this.sendData(
            ServerResponse.initLS(invoke('Config').authServer.protocol), false
        );
    }

    sendData(data, encrypt = true) {
        let header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);

        this.socket.write(
            Buffer.concat([header, encrypt ? Blowfish.encrypt(data) : data])
        );
    }

    receiveData(data) {
        let decryptedPacket = Blowfish.decrypt(Buffer.from(data).slice(2));
        Opcodes.table[decryptedPacket[0]](this, decryptedPacket);
    }
}

module.exports = Session;
