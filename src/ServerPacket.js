class ServerPacket {
    constructor(size) {
        this.buffer = Buffer.alloc(size + 4 + (size + 4) % 8);
        this.offset = 0;
    }
}

module.exports = ServerPacket;
