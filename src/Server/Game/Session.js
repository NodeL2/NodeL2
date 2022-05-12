let Opcodes = invoke('Server/Game/Opcodes');

class Session {
    constructor(socket) {
        this.socket = socket;
    }

    dataSend(data) {
        let header = Buffer.alloc(2);
        header.writeInt16LE(data.byteLength + 2);
        let encipheredPacket = invoke('Cipher/XOR').gameEncrypt(data);
        this.socket.write(Buffer.concat([header, encipheredPacket]));
    }

    dataReceive(data) {
        let decipheredPacket = Buffer.from(data).slice(2);
        decipheredPacket = invoke('Cipher/XOR').gameDecrypt(decipheredPacket);
        Opcodes.table[decipheredPacket[0]](this, decipheredPacket);
    }
}

module.exports = Session;
