let { initLS } = invoke('AuthServer/Response/InitLS');
let { blowfishDecrypt, blowfishEncrypt } = invoke('AuthServer/Blowfish');

class Session {
    constructor(socket) {
        this.socket = socket;
        this.socket.on('data', this.receiveData);

        // First handshake with client
        this.sendData(
            initLS(invoke('Config').optnAuthServer.protocol), false
        );
    }

    sendData(data, encrypt = true) {
        let header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);

        this.socket.write(
            Buffer.concat([header, encrypt ? blowfishEncrypt(data) : data])
        );
    }

    receiveData(data) {
        console.log(data);
        let decryptedPacket = blowfishDecrypt(Buffer.from(data).slice(2));
        console.log(decryptedPacket);
    }
}

module.exports = Session;
