const keyPair = require('node-forge').pki.rsa.generateKeyPair({
    bits: 1024, e: 0x10001
});

const RSA = {
    scrambleModulus: () => {
        let modulus = Buffer.from(keyPair.publicKey.n.toByteArray());
        let i, scrambled = modulus.slice(1, modulus.byteLength);

        for (i = 0; i < 4; i++) {
            [scrambled[i], scrambled[0x4d + i]] = [scrambled[0x4d + i], scrambled[i]];
        }

        for (i = 0; i < 0x40; i++) { scrambled[0x00 + i] ^= scrambled[0x40 + i]; }
        for (i = 0; i < 0x04; i++) { scrambled[0x0d + i] ^= scrambled[0x34 + i]; }
        for (i = 0; i < 0x40; i++) { scrambled[0x40 + i] ^= scrambled[0x00 + i]; }

        return scrambled;
    },

    decrypt: (data) => {
        return keyPair.privateKey.decrypt(data, 'NONE');
    }
};

module.exports = RSA;

const crypto = require('crypto');
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 1024,
});
const decryptedData = crypto.privateDecrypt({ key: privateKey, padding: crypto.constants.RSA_NO_PADDING }, encryptedData);
console.log("decrypted data: ", decryptedData.toString());