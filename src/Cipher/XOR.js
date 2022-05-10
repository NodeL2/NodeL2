let inKey   = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc8, 0x27, 0x93, 0x01, 0xa1, 0x6c, 0x31, 0x97]);
let outKey  = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc8, 0x27, 0x93, 0x01, 0xa1, 0x6c, 0x31, 0x97]);
let enabled = false;

const XOR = {
    encrypt: (data) => {
        let ecx = 0;

        for(let i = 4; i < data.length - 4; i += 4) {
            let edx = data.readInt32LE(i);
            ecx += edx;
            edx ^= ecx;
            data.writeInt32LE(edx, i);
        }

        return data;
    },

    gameDecrypt: (data) => {
        if (!enabled) { return data; }

        let ecx = 0;

        for(let i = 0; i < data.length; i++) {
            let edx = data[i];
            data[i] = edx ^ inKey[i & 0xf] ^ ecx;
            ecx = edx;
        }

        inKey.writeInt32LE(inKey.readInt32LE(8) + data.length, 8);
        return data;
    },

    gameEncrypt: (data) => {
        if (!enabled) { enabled = true; return data; }

        let ecx = 0;

        for(let i = 0; i < data.length; i++) {
            let edx = data[i];
            ecx ^= edx ^ outKey[i & 0xf];
            data[i] = ecx;
        }

        outKey.writeInt32LE(outKey.readInt32LE(8) + data.length, 8);
        return data;
    }
};

module.exports = XOR;
