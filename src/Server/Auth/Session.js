let ServerResponse = invoke('Server/Auth/Response');
let Opcodes        = invoke('Server/Auth/Opcodes');
let Config         = invoke('Config');

class Session {
    constructor(socket) {
        this.socket = socket;
        this.blowfishSecret = Buffer.from(Config.authServer.blowfishKey, 'hex');

        // First handshake from `Server` to `Client`
        this.dataSend(
            ServerResponse.initLS(Config.authServer.protocol, this.blowfishSecret)
        );
    }

    dataSend(data) {
        let header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);
        let encipheredPacket = require('blowfish-ecb').encipher(this.blowfishSecret, data);
        this.socket.write(Buffer.concat([header, encipheredPacket]));
    }

    dataReceive(data) {
        // Weird, sometimes the packet is sent twofold/duplicated. I had to split it based on the size header...
        let packet = data.slice(2, data.readInt16LE());
        let decipheredPacket = require('blowfish-ecb').decipher(this.blowfishSecret, packet);
        Opcodes.table[decipheredPacket[0]](this, decipheredPacket);
    }

    close() {
        console.log('AuthServer:: closed');
    }

    end() {
        console.log('AuthServer:: ended');
    }

    error(e) {
        console.log('AuthServer:: exception');
        console.log(e.stack);
    }
}

module.exports = Session;
