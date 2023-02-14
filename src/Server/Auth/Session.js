const ServerResponse = invoke('Server/Auth/Network/Response');
const Opcodes        = invoke('Server/Auth/Network/Opcodes');

class Session {
    constructor(socket) {
        const optn = options.connection.AuthServer;

        this.socket   = socket;
        this.id       = utils.randomNumber(0x80000000);
        this.key1     = utils.randomNumber(0x80000000);
        this.key2     = utils.randomNumber(0x80000000);
        this.protocol = optn.protocol;
        this.blowfish = optn.blowfishKey + '\u0000';

        // First handshake from `Server` to `Client`
        this.dataSend(
            ServerResponse.initLS(this.id, this.protocol), false
        );
    }

    setAccountId(username) {
        this.accountId = username;
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
        utils.infoWarn('AuthServer:: exception');
        utils.infoWarn(err.stack);
    }
}

module.exports = Session;
