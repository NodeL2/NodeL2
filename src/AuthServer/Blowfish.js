let Config = invoke('Config');

// Module imports
let Crypto = require('crypto');

class Blowfish {
    static encrypt(data) {
        let cipher = Crypto.createCipheriv('bf-ecb', Config.authServer.blowfishKey, '');
        cipher.setAutoPadding(false);

        data.swap32(); // Endianness: Big
        data = cipher.update(data);
        data.swap32(); // Endianness: Little

        return data;
    }

    static decrypt(data) {
        let decipher = Crypto.createDecipheriv('bf-ecb', Config.authServer.blowfishKey, '');
        decipher.setAutoPadding(false);

        data.swap32(); // Endianness: Big
        data = Buffer.concat([decipher.update(data), decipher.final()]);
        data.swap32(); // Endianness: Little

        return data;
    }
}

module.exports = Blowfish;
