class ServerPacket {
    constructor(opcode) {
        this.buffer = Buffer.from([opcode]);
    }

    append(data) {
        this.buffer = Buffer.concat([this.buffer, data]);
    }

    // Standard data types

    write(value, size) {
        let data = Buffer.alloc(size);

        switch (size) {
            case 1: data.writeUInt8    (value); break;
            case 2: data.writeUInt16LE (value); break;
            case 4: data.writeInt32LE  (value); break;
            case 8: data.writeDoubleLE (value); break;
        }

        this.append(data);
        return this;
    }

    writeC(value) {
        return this.write(value, 1);
    }

    writeH(value) {
        return this.write(value, 2);
    }

    writeD(value) {
        return this.write(value, 4);
    }

    writeF(value) {
        return this.write(value, 8);
    }

    // Special cases

    writeB(array) {
        this.append(Buffer.from(array));
        return this;
    }

    writeS(text) {
        this.append(Buffer.from(text, 'ucs2'));
        this.append(Buffer.alloc(2));
        return this;
    }

    // Buffer

    fetchBuffer(checksum = true) {
        this.append(invoke('Utils').pad32Bits(this.buffer));

        if (checksum) {
            this.append(Buffer.alloc(4 + (this.buffer.byteLength + 4) % 8));
        }
        return this.buffer;
    }
}

module.exports = ServerPacket;
