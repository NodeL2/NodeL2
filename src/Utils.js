let os = require('os');

class Utils {
    static toHex(value, padding) {
        return Number(value).toString(16).padStart(padding, '0');
    }

    static toAsciiStripNull(value) {
        return value.toString().replace(/\u0000/gi, '');
    }

    static matchSessionKeys(pair1, pair2) {
        return (pair1.sessionKey1 === pair2.sessionKey1) && (pair1.sessionKey2 === pair2.sessionKey2);
    }

    static textLength(string) {
        return Buffer.byteLength(string, 'ucs2') + 2;
    }

    static fetchIPv4Address() {
        let network = os.networkInterfaces();
        let adapter = network['en0'];
        let ipv4    = adapter.filter(item => item.family === 'IPv4');
        return ipv4[0].address;
    }
}

module.exports = Utils;

class Packet {
    constructor(opcode) {
        this.buffer = Buffer.from([opcode]);
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

        this.buffer = Buffer.concat([this.buffer, Buffer.from(data.buffer)]);
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
        this.buffer = Buffer.concat([
            this.buffer, new Uint8Array(array.reverse())
        ]);
        return this;
    }

    writeS(text) {
        this.buffer = Buffer.concat([
            this.buffer, Buffer.from(text, 'ucs2'), Buffer.alloc(2)
        ]);
        return this;
    }

    // Buffer

    fetchBuffer(checksum = true) {
        let ext = Buffer.alloc(4 + (this.buffer.byteLength + 4) % 8);
        return (checksum) ? Buffer.concat([this.buffer, ext]) : this.buffer;
    }
}
