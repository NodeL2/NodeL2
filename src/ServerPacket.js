class ServerPacket {
    constructor(size) {
        this.buffer = Buffer.alloc(size + 4 + (size + 4) % 8);
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
        this.buffer.writeInt32LE(data, this.offset);
        this.offset += 4;

        return this;
    }

    writeF(value) {
        this.buffer.writeDoubleLE(value, this.offset);
        this.offset += 8;

        return this;
    }

    writeS(str) {
        this.buffer.write(str, this.offset, 'ucs2');
        this.offset += Buffer.byteLength(str, 'ucs2') + 2;

        return this;
    }
}

module.exports = ServerPacket;
