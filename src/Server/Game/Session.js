const Opcodes = invoke('Server/Game/Opcodes');

class Session {
    constructor(socket) {
        this.socket = socket;
        invoke('Cipher/XOR').reset();
    }

    dataSend(data) {
        const header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);
        const encipheredPacket = invoke('Cipher/XOR').gameEncipher(data);
        this.socket.write(Buffer.concat([header, encipheredPacket]));
    }

    dataReceive(data) {
        // Weird, sometimes the packet is sent twofold/duplicated. I had to limit it based on the header size...
        const packet = data.slice(2, data.readInt16LE());
        const decipheredPacket = invoke('Cipher/XOR').gameDecipher(packet);
        Opcodes.table[decipheredPacket[0]](this, decipheredPacket);
    }

    error(err) {
        console.info('AuthServer:: exception');
        console.info(err.stack);
    }
}

module.exports = Session;
