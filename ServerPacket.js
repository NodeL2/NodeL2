class ServerPacket {
    constructor(size) {
        this.buffer = new Buffer.alloc(size + 4 + (size + 4) % 8);
        this.offset = 0;
    }

    writeC(data) {
        this.buffer.writeInt8(data, this.offset);
        this.offset += 1;

        return this;
    }

    writeD(data) {
        this.buffer.writeInt32LE(data, this.offset);
        this.offset += 4;

        return this;
    }
}

module.exports = ServerPacket;
