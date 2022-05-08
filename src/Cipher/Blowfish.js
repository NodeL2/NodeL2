let { createDecipheriv, createCipheriv } = require('crypto');

// Before L2 C6 interlude, the Blowfish secret was hardcoded in the clients. We know it beforehand.
let key = Buffer.from([0x6b,0x60,0xcb,0x5b,0x82,0xce,0x90,0xb1,0xcc,0x2b,0x6c,0x55,0x6c,0x6c,0x6c,0x6c]);//invoke('Config').authServer.blowfishKey + '\u0000';

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
