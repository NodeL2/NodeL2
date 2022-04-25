let NodeRSA = require('node-rsa');

const key = new NodeRSA({ b: 1024 });
key.setOptions({
    encryptionScheme: {
         scheme: 'pkcs1',
        padding: require('constants').RSA_NO_PADDING
    }
});

const RSA = {
    scrambleModulus: () => {
        let modulus = Buffer.from(key.exportKey('components-public').n);
        let i, scrambled = modulus.slice(1, modulus.byteLength);

        for (i = 0; i < 4; i++) {
            [scrambled[i], scrambled[0x4d + i]] = [scrambled[0x4d + i], scrambled[i]];
        }

        for (i = 0; i < 0x40; i++) { scrambled[0x00 + i] ^= scrambled[0x40 + i]; }
        for (i = 0; i < 0x04; i++) { scrambled[0x0d + i] ^= scrambled[0x34 + i]; }
        for (i = 0; i < 0x40; i++) { scrambled[0x40 + i] ^= scrambled[0x00 + i]; }

        return scrambled;
    },

    decryptAscii: (data) => {
        return key.decrypt(data, 'ascii');
    },

    decrypt: (data) => {
        return key.decrypt(data);
    }
};

module.exports = RSA;
