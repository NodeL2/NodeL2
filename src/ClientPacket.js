class ClientPacket {
    constructor(buffer) {
        this.buffer = buffer;
        this.offset = 1; // Skip the opcode id
        this.data   = [];
    }

    append(value) {
        this.data.push(value);
    }

    // Standard data types

    read(size) {
        switch (size) {
            case 1: this.append(this.buffer.readUInt8    (this.offset)); break;
            case 2: this.append(this.buffer.readUInt16LE (this.offset)); break;
            case 4: this.append(this.buffer.readUInt32LE (this.offset)); break;
        }

        this.offset += size;
        return this;
    }

    readC() {
        return this.read(1);
    }

    readH() {
        return this.read(2);
    }

    readD() {
        return this.read(4);
    }

    // Special cases

    readB(size) {
        this.append(
            this.buffer.slice(this.offset, this.offset + size)
        );

        this.offset += size;
        return this;
    }

    readS() {
        const index = this.buffer.indexOf(0x0000, this.offset) + 1;
        if (index > 0) {
            this.append(
                this.buffer.toString('ucs2', this.offset, index)
            );
            this.offset += index + 1;
        }
        return this;
    }
}

module.exports = ClientPacket;
