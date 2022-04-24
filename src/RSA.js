let NodeRSA = require('node-rsa');

let key = new NodeRSA({b: 1024});

const RSA = {
    fetchPublicKey: () => {
        return key.exportKey('pkcs8-public-der'); // pkcs1-pem
    },

    fetchModulus: () => {
        return key.exportKey('components-public').n;
    }
};
