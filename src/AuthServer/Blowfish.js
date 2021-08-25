let crypto = require('crypto');

class Blowfish {
    static key = invoke('Config').authServer.blowfishKey + '\u0000';

    static encrypt(data) {
        let cipher = crypto.createCipheriv('bf-ecb', Blowfish.key, '');
        cipher.setAutoPadding(false);

        data.swap32(); // Endianness: Big
        data = cipher.update(data);
        data.swap32(); // Endianness: Little

        return data;
    }

    static decrypt(data) {
        let decipher = crypto.createDecipheriv('bf-ecb', Blowfish.key, '');
        decipher.setAutoPadding(false);

        data.swap32(); // Endianness: Big
        data = Buffer.concat([decipher.update(data), decipher.final()]);
        data.swap32(); // Endianness: Little

        return data;
    }
}

module.exports = Blowfish;
