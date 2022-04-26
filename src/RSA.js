let forge = require('node-forge');

var rsa = forge.pki.rsa;
var keypair = rsa.generateKeyPair({bits: 1024, e: 0x10001});
const modulus = Buffer.from(keypair.publicKey.n.toString(16), 'hex');
//console.log(modulus.length);

const RSA = {
    scrambleModulus: () => {
        let i, scrambled = Buffer.from(modulus);

        for (i = 0; i < 4; i++) {
            [scrambled[i], scrambled[0x4d + i]] = [scrambled[0x4d + i], scrambled[i]];
        }

        for (i = 0; i < 0x40; i++) { scrambled[0x00 + i] ^= scrambled[0x40 + i]; }
        for (i = 0; i < 0x04; i++) { scrambled[0x0d + i] ^= scrambled[0x34 + i]; }
        for (i = 0; i < 0x40; i++) { scrambled[0x40 + i] ^= scrambled[0x00 + i]; }

        return scrambled;
    },

    decrypt: (data) => {
        return keypair.privateKey.decrypt(data);
    }
};

module.exports = RSA;
