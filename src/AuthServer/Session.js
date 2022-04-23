let Blowfish       = invoke('Blowfish');
let ClientRequest  = invoke('AuthServer/Request');
let ServerResponse = invoke('AuthServer/Response');
let Utils          = invoke('Utils');

class Session {
    constructor(socket) {
        this.socket = socket;
        this.socket.on('data', this.receiveData.bind(this));

        this.opcodes = Array(0xff).fill((_, decryptedPacket) => {
            fatalError('AuthServer:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
        });

        this.opcodes[0x00] = ClientRequest.authLogin;
        this.opcodes[0x07] = ClientRequest.authGG;

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
        this.opcodes[decryptedPacket[0]](this, decryptedPacket);
    }
}

module.exports = Session;
