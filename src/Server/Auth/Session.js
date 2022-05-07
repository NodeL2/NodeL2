let ServerResponse = invoke('Server/Auth/Response');
let Opcodes        = invoke('Server/Auth/Opcodes');
let Blowfish       = invoke('Cipher/Blowfish');

class Session {
    constructor(socket) {
        this.socket = socket;

        // First handshake from `Server` to `Client`
        this.dataSend(
            ServerResponse.initLS(invoke('Config').authServer.protocol), true
        );
    }

    dataSend(data, encrypt = true) {
        let header = Buffer.alloc(2);
        header.writeInt16LE(data.byteLength + 2);
        console.log(data.byteLength);
        data = data.slice(2);
        console.log(data.byteLength);
        data = Buffer.concat([data,Buffer.alloc(2)]);
        console.log(data.byteLength);
        this.socket.write(Buffer.concat([header, encrypt ? Blowfish.encrypt(data) : data]));
    }

    dataReceive(data) {
        let decryptedPacket = Blowfish.decrypt(Buffer.from(data).slice(2));
        Opcodes.table[decryptedPacket[0]](this, decryptedPacket);
    }
}

module.exports = Session;
