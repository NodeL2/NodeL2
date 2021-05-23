class ServerSession {
    constructor(socket) {
        this.socket = socket;
    }

    sendPacket(packet, encrypt = true) {
        let header = new Buffer.from([packet.length + 2, 0x00]);

        if (encrypt) {
            console.log('Encryption failed');
        }
        else {
            packet = Buffer.concat([header, packet]);
            this.socket.write(packet);
        }
    }
}

module.exports = ServerSession;
