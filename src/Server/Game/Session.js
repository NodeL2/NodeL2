let Opcodes = invoke('Server/Game/Opcodes');

class Session {
    constructor(socket) {
        this.socket = socket;
    }

    dataSend(data) {
        let header = Buffer.alloc(2);
        header.writeInt16LE(data.byteLength + 2);
        this.socket.write(Buffer.concat([header, data]));
    }

    dataReceive(data) {
        let decryptedPacket = Buffer.from(data).slice(2);
        decryptedPacket = invoke('XOR').gameDecrypt(decryptedPacket);
        Opcodes.table[decryptedPacket[0]](this, decryptedPacket);
    }
}

module.exports = Session;
