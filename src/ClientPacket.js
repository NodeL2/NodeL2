class ClientPacket {
    constructor(buffer) {
        this.buffer = buffer;
        this.data   = [];
        this.offset = 1; // Skip the opcode id
    }

    readC() {
        this.data.push(
            this.buffer.readUInt8(this.offset)
        );
        this.offset += 1;

        return this;
    }

    readB(size) {
        this.data.push(
            this.buffer.slice(this.offset, this.offset + size)
        );
        this.offset += size;

        return this;
    }
}

module.exports = ClientPacket;
