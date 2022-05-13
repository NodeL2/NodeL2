const secret = [
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc8, 0x27, 0x93, 0x01, 0xa1, 0x6c, 0x31, 0x97
];

const XOR = {
    init: () => {
        return {
            secret1: Buffer.from(secret),
            secret2: Buffer.from(secret),
            enabled: false
        };
    },

    encipher: (data) => {
        let ecx = 0;

        for(let i = 4; i < data.length - 4; i += 4) {
            let edx = data.readInt32LE(i);
            ecx += edx;
            edx ^= ecx;
            data.writeInt32LE(edx, i);
        }

        return data;
    },

    gameDecipher: (xor, data) => {
        if (!xor.enabled) { return data; }

        let ecx = 0;

        for(let i = 0; i < data.length; i++) {
            let edx = data[i];
            data[i] = edx ^ xor.secret1[i & 0xf] ^ ecx;
            ecx = edx;
        }

        xor.secret1.writeInt32LE(xor.secret1.readInt32LE(8) + data.length, 8);
        return data;
    },

    gameEncipher: (xor, data) => {
        if (!xor.enabled) { xor.enabled = true; return data; }

        let ecx = 0;

        for(let i = 0; i < data.length; i++) {
            let edx = data[i];
            ecx ^= edx ^ xor.secret2[i & 0xf];
            data[i] = ecx;
        }

        xor.secret2.writeInt32LE(xor.secret2.readInt32LE(8) + data.length, 8);
        return data;
    }
};

module.exports = XOR;
