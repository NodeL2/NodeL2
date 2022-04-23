let { initLS } = invoke('AuthServer/Response/InitLS');
let { blowfishDecrypt, blowfishEncrypt } = invoke('AuthServer/Blowfish');
let { authGG } = invoke('AuthServer/Request/GGAuth');

class Session {
    constructor(socket) {
        this.socket = socket;
        this.socket.on('data', this.receiveData.bind(this));

        this.opcodes = Array(0xff).fill((_, decryptedPacket) => {
            fatalError('AuthServer:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
        });

        this.opcodes[0x07] = authGG;

        // First handshake with client
        this.sendData(
            initLS(invoke('Config').optnAuthServer.protocol), false
        );
    }

    sendData(data, encrypt = true) {
        let header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);

        this.socket.write(
            Buffer.concat([header, encrypt ? blowfishEncrypt(data) : data])
        );
    }

    receiveData(data) {
        let decryptedPacket = blowfishDecrypt(Buffer.from(data).slice(2));
        this.opcodes[decryptedPacket[0]](this, decryptedPacket);
    }
}

module.exports = Session;
