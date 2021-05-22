class ServerSession {
    constructor(socket) {
        this.socket = socket;
    }

    sendPacket(packet, encrypt = true) {
        if (encrypt) {
            console.log('Encryption failed');
        }
        else {
            var packetLength = new Buffer.from([0x00, 0x00]);
            packetLength.writeInt16LE(packet.length + 2);
            //console.log(packetLength);
            packet = Buffer.concat([packetLength, packet]);
            //console.log(packet);
            this.socket.write(packet);
        }
    }
}

module.exports = ServerSession;
