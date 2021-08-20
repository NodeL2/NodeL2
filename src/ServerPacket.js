class ServerPacket {
    constructor(opcode) {
        this.buffer = Buffer.from([opcode]);
    }

    append(array) {
        this.buffer = Buffer.concat([this.buffer, array]);
    }

    // Standard data types

    write(value, size) {
        let data = new DataView(new ArrayBuffer(size));

        switch (size) {
            case 1: data.setUint8  (0, value, true); break;
            case 2: data.setUint16 (0, value, true); break;
            case 4: data.setUint32 (0, value, true); break;
            case 8: data.setFloat64(0, value, true); break;
        }

        this.append(Buffer.from(data.buffer));
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
        this.append(new Uint8Array(array.reverse()));
        return this;
    }

    writeS(text) {
        this.append(Buffer.from(text, 'ucs2'));
        this.append(Buffer.alloc(2));
        return this;
    }

    // Buffer

    fetchBuffer(checksum = true) {
        // 32-bit align
        let size = this.buffer.byteLength;
        this.append(Buffer.alloc((Math.ceil(size / 4) * 4) - size));

        if (checksum) {
            this.append(Buffer.alloc(4 + (this.buffer.byteLength + 4) % 8));
        }
        return this.buffer;
    }
}

module.exports = ServerPacket;
