const keyPair = require('node-forge').pki.rsa.generateKeyPair({
    bits: 1024, e: 0x10001
});

const RSA = {
    scrambleModulus: () => {
        let modulus = Buffer.from(keyPair.publicKey.n.toByteArray());
        let i, scrambled = modulus.slice(1);

        for (i = 0; i < 4; i++) {
            [scrambled[i], scrambled[0x4d + i]] = [scrambled[0x4d + i], scrambled[i]];
        }

        for (i = 0; i < 0x40; i++) { scrambled[0x00 + i] ^= scrambled[0x40 + i]; }
        for (i = 0; i < 0x04; i++) { scrambled[0x0d + i] ^= scrambled[0x34 + i]; }
        for (i = 0; i < 0x40; i++) { scrambled[0x40 + i] ^= scrambled[0x00 + i]; }

        return scrambled;
    },

    decrypt: (data) => {
        return keyPair.privateKey.decrypt(data, 'RAW');
    }
};

module.exports = RSA;
