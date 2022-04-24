let NodeRSA = require('node-rsa');

let key = new NodeRSA({b: 1024});
key.setOptions({
    encryptionScheme: 'pkcs1',
    signingScheme: 'pkcs1'
});

console.log(key);

const RSA = {
    fetchPublicKey: () => {
        return key.exportKey('pkcs1-public-der'); // pkcs1-pem
    },

    fetchModulus: () => {
        return key.exportKey('components-public').n;
    },

    scrambleModulus: (modulus) => {
        let i, n = Buffer.from(modulus);

        for (i = 0; i < 4; i++) {
            [n[i], n[0x4d + i]] = [n[0x4d + i], n[i]];
        }

        for (i = 0; i < 0x40; i++) { n[0x00 + i] = n[0x00 + i] ^ n[0x40 + i]; }
        for (i = 0; i < 0x04; i++) { n[0x0d + i] = n[0x0d + i] ^ n[0x34 + i]; }
        for (i = 0; i < 0x40; i++) { n[0x40 + i] = n[0x40 + i] ^ n[0x00 + i]; }

        return n;
    },

    decrypt: (encryptedText) => {
        return key.decrypt(encryptedText, 'utf8');
    },

    encrypt: (text) => {
        return key.encrypt(text, 'base64');
    }
};

module.exports = RSA;
