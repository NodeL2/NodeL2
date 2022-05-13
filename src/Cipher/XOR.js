const secret = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc8, 0x27, 0x93, 0x01, 0xa1, 0x6c, 0x31, 0x97];
let key1, key2, enabled = false;

const XOR = {
    reset: () => {
        key1 = Buffer.from(secret);
        key2 = Buffer.from(secret);
        console.log(secret);
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

    gameDecipher: (data) => {
        if (!enabled) { return data; }

        let ecx = 0;

        for(let i = 0; i < data.length; i++) {
            let edx = data[i];
            data[i] = edx ^ key1[i & 0xf] ^ ecx;
            ecx = edx;
        }

        key1.writeInt32LE(key1.readInt32LE(8) + data.length, 8);
        return data;
    },

    gameEncipher: (data) => {
        if (!enabled) { enabled = true; return data; }

        let ecx = 0;

        for(let i = 0; i < data.length; i++) {
            let edx = data[i];
            ecx ^= edx ^ key2[i & 0xf];
            data[i] = ecx;
        }

        key2.writeInt32LE(key2.readInt32LE(8) + data.length, 8);
        return data;
    }
};

module.exports = XOR;
