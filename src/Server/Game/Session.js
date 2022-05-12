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
        let packet = Buffer.from(data).slice(2);
        let decipheredPacket = invoke('Cipher/XOR').gameDecrypt(packet);
        Opcodes.table[decipheredPacket[0]](this, decipheredPacket);
    }
}

module.exports = Session;
