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
        let encipheredPacket = require('blowfish-ecb').encipher(this.blowfishSecret, data)
        this.socket.write(Buffer.concat([header, encipheredPacket]));
    }

    dataReceive(data) {
        let packet = Buffer.from(data).slice(2)
        let decipheredPacket = require('blowfish-ecb').decipher(this.blowfishSecret, packet);
        Opcodes.table[decipheredPacket[0]](this, decipheredPacket);
    }
}

module.exports = Session;
