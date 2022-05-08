let ServerResponse = invoke('Server/Auth/Response');
let Opcodes        = invoke('Server/Auth/Opcodes');
let Blowfish       = invoke('Cipher/Blowfish');

class Session {
    constructor(socket) {
        this.socket = socket;

        // First handshake from `Server` to `Client`
        this.dataSend(
            ServerResponse.initLS(invoke('Config').authServer.protocol), true
        );
    }

    dataSend(data, encrypt = true) {
        //let header = Buffer.alloc(2);
        //header.writeInt16LE(data.byteLength + 2);
        //this.socket.write(Buffer.concat([header, encrypt ? Blowfish.encrypt(data) : data]));

        data = Buffer.concat([data, Buffer.alloc(8)]);

        let xor = new XOR(0);
        data = xor.encrypt(data);
        //data = data.slice(2);

        let header = Buffer.alloc(2);
        header.writeInt16LE(data.byteLength + 2);

        //data = Buffer.concat([data, Buffer.alloc(2)]);

        this.socket.write(Buffer.concat([header, encrypt ? Blowfish.encrypt(data) : data]));
    }

    dataReceive(data) {
        let decryptedPacket = Blowfish.decrypt(Buffer.from(data).slice(2));
        Opcodes.table[decryptedPacket[0]](this, decryptedPacket);
    }
}

module.exports = Session;

class XOR {
    constructor(key) {
        this.key = new Int32Array(new ArrayBuffer(4));
        this.key[0] = key;
    }

    encrypt(data) {
        invoke('Utils').dumpBuffer(data);
        for (let i = 4; i < data.byteLength - 2; i += 4) {
            let next = data.readInt32LE(i);
            this.key[0] += next;
            next ^= this.key[0];
            data.writeInt32LE(next, i);
        }
        console.log(data.length);
        invoke('Utils').dumpBuffer(data);
        //data.writeInt32LE(this.key[0], 169);
        invoke('Utils').dumpBuffer(data);
        //console.log('0x%s', invoke('Utils').toHex(this.key, 8));
        return data;
    }
}