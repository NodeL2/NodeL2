let Blowfish      = invoke('AuthServer/Blowfish');
let ClientRequest = invoke('AuthServer/Request');
let Utils         = invoke('Utils');

class Session {
    constructor(socket) {
        this.socket = socket;
        this.opcodes = Array(0xff).fill((_, decryptedPacket) => {
            fatalError('AuthServer:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
        });

        this.opcodes[0x00] = ClientRequest.authoriseLogin;
        this.opcodes[0x02] = ClientRequest.gameLogin;
        this.opcodes[0x05] = ClientRequest.serverList;
    }

    receiveData(data) {
        let decryptedPacket = Blowfish.decrypt(Buffer.from(data).slice(2));
        this.opcodes[decryptedPacket[0]](this, decryptedPacket);
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
