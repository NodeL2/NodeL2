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
        this.offset++;

        return this;
    }

    readB = function(length) {
        this.data.push(
            this.buffer.slice(this.offset, this.offset + length)
        );
        this.offset += length;

        return this;
    }
}

module.exports = ClientPacket;
