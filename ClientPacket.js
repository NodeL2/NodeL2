class ClientPacket {
    constructor(buffer) {
        this.buffer = buffer;
        this.data   = [];
        this.offset = 0;
    }

    readC() {
        this.data.push(
            this.buffer.readInt8(this.offset)
        );
        this.offset += 1;

        return this;
    }

    readD() {
        this.data.push(
            this.buffer.readUInt32LE(this.offset)
        );
        this.offset += 4;
    
        return this;
    }

    readS = function(size) {
        this.data.push(
            this.buffer.slice(this.offset, this.offset + size)
        );
        this.offset += size;

        return this;
    }
}

module.exports = ClientPacket;
