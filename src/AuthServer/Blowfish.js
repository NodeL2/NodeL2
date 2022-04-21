let { createDecipheriv, createCipheriv } = require('crypto');

const blowfishKey = invoke('Config').optnAuthServer.blowfishKey + '\u0000';

exports.blowfishDecrypt = (data) => {
    let decipher = createDecipheriv('bf-ecb', blowfishKey, '');
    decipher.setAutoPadding(false);
    data = Buffer.concat([
        decipher.update(data.swap32()), decipher.final()
    ]);

    return data.swap32();
};

exports.blowfishEncrypt = (data) => {
    let cipher = createCipheriv('bf-ecb', blowfishKey, '');
    cipher.setAutoPadding(false);
    data = cipher.update(data.swap32());

    return data.swap32();
};
