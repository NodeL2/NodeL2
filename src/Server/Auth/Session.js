const ServerResponse = invoke('Server/Auth/Response');
const Opcodes        = invoke('Server/Auth/Opcodes');

class Session {
    constructor(socket) {
        const { authServer } = invoke('Config');

        this.socket    = socket;
        this.sessionId = invoke('Utils').randomNumber(0x80000000);
        this.protocol  = authServer.protocol;
        this.blowfish  = Buffer.from(authServer.blowfishKey, 'hex');

        // First handshake from `Server` to `Client`
        this.dataSend(
            ServerResponse.initLS(this.sessionId, this.protocol, this.blowfish)
        );
    }

    dataSend(data) {
        const header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);
        const encipheredPacket = require('blowfish-ecb').encipher(this.blowfish, data);
        this.socket.write(Buffer.concat([header, encipheredPacket]));
    }

    dataReceive(data) {
        // Weird, sometimes the packet is sent twofold/duplicated. I had to limit it based on the header size...
        const packet = data.slice(2, data.readInt16LE());
        const decipheredPacket = require('blowfish-ecb').decipher(this.blowfish, packet);
        Opcodes.table[decipheredPacket[0]](this, decipheredPacket);
    }

    error(err) {
        console.info('AuthServer:: exception');
        console.info(err.stack);
    }
}

module.exports = Session;
