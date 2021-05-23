class ServerPacket {
    constructor(size) {
        this.buffer = new Buffer.alloc(size + 4 + (size + 4) % 8);
        this.offset = 0;
    }

    writeC(data) {
        this.buffer.writeUInt8(data, this.offset);
        this.offset += 1;

        return this;
    }

    writeH(data) {
        this.buffer.writeUInt16LE(data, this.offset);
        this.offset += 2;

        return this;
    }

    writeD(data) {
        this.buffer.writeUInt32LE(data, this.offset);
        this.offset += 4;

        return this;
    }
}

module.exports = ServerPacket;
