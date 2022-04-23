class ClientPacket {
    constructor(buffer) {
        this.buffer = buffer;
        this.offset = 1; // Skip the opcode id
        this.data   = [];
    }

    // Standard data types

    read(size) {
        switch (size) {
            case 1: this.data.push(this.buffer.readUInt8    (this.offset)); break;
            case 2: this.data.push(this.buffer.readUInt16LE (this.offset)); break;
            case 4: this.data.push(this.buffer.readInt32LE  (this.offset)); break;
        }

        this.offset += size;
        return this;
    }

    readD() {
        return this.read(4);
    }
}

module.exports = ClientPacket;
