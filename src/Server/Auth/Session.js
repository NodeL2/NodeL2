const ServerResponse = invoke('Server/Auth/Response');
const Opcodes        = invoke('Server/Auth/Opcodes');

class Session {
    constructor(socket) {
        const { AuthServer: optn } = invoke('Config');

        this.socket    = socket;
        this.sessionId = invoke('Utils').randomNumber(0x80000000);
        this.protocol  = optn.protocol;
        this.blowfish  = '[;\'.]94-31==-%&@!^+]\u0000';

        // First handshake from `Server` to `Client`
        this.dataSend(
            ServerResponse.initLS(this.sessionId, this.protocol), false
        );
    }

    dataReceive(data) {
        // Weird, sometimes the packet is sent twofold/duplicated. I had to limit it based on the header size...
        const packet = data.slice(2, data.readInt16LE());
        const decipheredPacket = require('blowfish-ecb').decipher(this.blowfish, packet);
        Opcodes.table[decipheredPacket[0]](this, decipheredPacket);
    }

    dataSend(data, encipher = true) {
        const header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);
        const encipheredPacket = encipher ? require('blowfish-ecb').encipher(this.blowfish, data) : data;
        this.socket.write(Buffer.concat([header, encipheredPacket]));
    }

    error(err) {
        infoWarn('AuthServer:: exception');
        infoWarn(err.stack);
    }
}

module.exports = Session;
