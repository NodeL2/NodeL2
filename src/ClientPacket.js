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

    readD() {
        this.data.push(
            this.buffer.readInt32LE(this.offset)
        );
        this.offset += 4;

        return this;
    }

    readB(size) {
        this.data.push(
            this.buffer.slice(this.offset, this.offset + size)
        );
        this.offset += size;

        return this;
    }

    readS() {
        let i;

        for (i = this.offset; i < this.buffer.length; i += 2) {
            if (this.buffer.readUInt16LE(i) === 0x00) {
                break;
            }
        }

        this.data.push(
            this.buffer.toString('ucs2', this.offset, i)
        );
        this.offset += i + 1;

        return this;
    }
}

module.exports = ClientPacket;
