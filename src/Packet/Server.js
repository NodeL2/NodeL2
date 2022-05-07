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
            case 4: data.writeUInt32LE (value); break;
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
        this.append(Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
        let xor = new XOR(0);
        invoke('Utils').dumpBuffer(this.buffer);
        this.buffer = xor.encrypt(this.buffer);
        invoke('Utils').dumpBuffer(this.buffer);

        // 32-bit align
        //let size = this.buffer.byteLength;
        //this.append(Buffer.alloc((Math.ceil(size / 4) * 4) - size));

        if (checksum) {
            this.append(Buffer.alloc(4 + (this.buffer.byteLength + 4) % 8));
        }
        return this.buffer;
    }
}

module.exports = ServerPacket;

class XOR {
    constructor(key) {
        //this.key = key;
        this.key = new Int32Array(new ArrayBuffer(4));
        this.key[0] = key;
    }

    encrypt(data) {
        for (let i = 4; i < data.byteLength - 8; i += 4) {
            let next = data.readInt32LE(i);
            this.key[0] += next;
            next ^= this.key[0];
            data.writeInt32LE(next, i - 4);
        }
        data.writeInt32LE(this.key[0], 172);
        //console.log('0x%s', invoke('Utils').toHex(this.key, 8));
        return data;
    }

    encrypt2(data) {
        const stop = data.byteLength - 8;
        let pos = 4;

        while (pos < stop) {
            let edx = data[pos] & 0xff;
            edx |= (data[pos + 1] & 0xff) << 8;
            edx |= (data[pos + 2] & 0xff) << 16;
            edx |= (data[pos + 3] & 0xff) << 24;
            this.key[0] += edx;
            edx ^= this.key[0];
            data[pos++] = edx & 0xff;
            data[pos++] = (edx >>> 8) & 0xff;
            data[pos++] = (edx >>> 16) & 0xff;
            data[pos++] = (edx >>> 24) & 0xff;
        }

        data[pos++] = this.key[0] & 0xff;
        data[pos++] = (this.key[0] >>> 8) & 0xff;
        data[pos++] = (this.key[0] >>> 16) & 0xff;
        data[pos] = (this.key[0] >>> 24) & 0xff;

        return data;
    }
}
