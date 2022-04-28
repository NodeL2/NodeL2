let { createDecipheriv, createCipheriv } = require('crypto');

const key = invoke('Config').authServer.blowfishKey + '\u0000';

const Blowfish = {
    decrypt: function(data) {
        let decipher = createDecipheriv('bf-ecb', key, '').setAutoPadding(false);

        data = Buffer.concat([
            decipher.update(data.swap32()), decipher.final()
        ]);

        return data.swap32();
    },

    encrypt: function(data) {
        let cipher = createCipheriv('bf-ecb', key, '').setAutoPadding(false);
        data = cipher.update(data.swap32());

        return data.swap32();
    }
};

module.exports = Blowfish;
