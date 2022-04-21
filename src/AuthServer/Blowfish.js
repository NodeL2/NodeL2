let { createDecipheriv, createCipheriv } = require('crypto');

const blowfishKey = invoke('Config').optnAuthServer.blowfishKey + '\u0000';

exports.blowfishDecrypt = (data) => {
    let decipher = createDecipheriv('bf-ecb', blowfishKey, '');
    decipher.setAutoPadding(false);

    data.swap32();
    data = Buffer.concat([decipher.update(data), decipher.final()]);
    data.swap32();

    return data;
};

exports.blowfishEncrypt = (data) => {
    let cipher = createCipheriv('bf-ecb', blowfishKey, '');
    cipher.setAutoPadding(false);

    data.swap32();
    data = cipher.update(data);
    data.swap32();

    return data;
};
