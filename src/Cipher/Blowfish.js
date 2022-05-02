let { createDecipheriv, createCipheriv } = require('crypto');

// Before L2 C6 interlude, the Blowfish secret was hardcoded in the clients. We know it beforehand.
let key = invoke('Config').authServer.blowfishKey + '\u0000';

const Blowfish = {
    decrypt: (data) => { // Switch endianness to decode
        let decipher = createDecipheriv('bf-ecb', key, '').setAutoPadding(false);

        data = Buffer.concat([
            decipher.update(data.swap32()), decipher.final()
        ]);

        return data.swap32();
    },

    encrypt: (data) => { // Switch endianness to encode
        let cipher = createCipheriv('bf-ecb', key, '').setAutoPadding(false);
        data = cipher.update(data.swap32());

        return data.swap32();
    }
};

module.exports = Blowfish;
