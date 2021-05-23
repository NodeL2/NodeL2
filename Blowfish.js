let crypto = require('crypto');

// User define
let Config = require('./Config');

class Blowfish {
    static encrypt(data) {
        let cipher = crypto.createCipheriv('bf-ecb', Config.blowfishKey, '');
        cipher.setAutoPadding(false);

        data = (new Buffer.from(data)).swap32(); // Endianess: Big
        data = cipher.update(data);
        data.swap32(); // Endianess: Little

        return data;
    }

    static decrypt(data) {
        let decipher = crypto.createDecipheriv('bf-ecb', Config.blowfishKey, '');
        decipher.setAutoPadding(false);

        data.swap32(); // Endianess: Big
        data = Buffer.concat([decipher.update(data), decipher.final()]);
        data.swap32(); // Endianess: Little

        return data;
    }
}

module.exports = Blowfish;
