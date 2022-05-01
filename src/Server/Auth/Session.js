let Opcodes        = require('@Auth/Opcodes');
let ServerResponse = require('@Auth/Response');
let Blowfish       = require('@Blowfish');

class Session {
    constructor(socket) {
        this.socket = socket;

        // First handshake with client
        this.dataSend(
            ServerResponse.initLS(require('@Config').authServer.protocol), false
        );
    }

    dataSend(data, encrypt = true) {
        let header = Buffer.alloc(2);
        header.writeInt16LE(data.byteLength + 2);
        this.socket.write(Buffer.concat([header, encrypt ? Blowfish.encrypt(data) : data]));
    }

    dataReceive(data) {
        let decryptedPacket = Blowfish.decrypt(Buffer.from(data).slice(2));
        Opcodes.table[decryptedPacket[0]](this, decryptedPacket);
    }
}

module.exports = Session;
