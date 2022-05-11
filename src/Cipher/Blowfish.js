//let { createDecipheriv, createCipheriv } = require('crypto');
//
//const Blowfish = {
//    key: Buffer.from(invoke('Config').authServer.blowfishKey, 'hex'),
//
//    decrypt: (data) => { // Switch endianness to decode
//        let decipher = createDecipheriv('bf-ecb', Blowfish.key, '').setAutoPadding(false);
//
//        data = Buffer.concat([
//            decipher.update(data.swap32()), decipher.final()
//        ]);
//
//        return data.swap32();
//    },
//
//    encrypt: (data) => { // Switch endianness to encode
//        let cipher = createCipheriv('bf-ecb', Blowfish.key, '').setAutoPadding(false);
//        data = cipher.update(data.swap32());
//
//        return data.swap32();
//    }
//};
//
//module.exports = Blowfish;
