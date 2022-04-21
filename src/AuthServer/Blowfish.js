let { Fish } = require('raptor-blowfish');

class Blowfish {
    constructor() {
        let { optnAuthServer: optn } = invoke('Config');

        let cipher = Fish.createCipher(optn.blowfishKey);
        let encrypted = cipher.encrypt('Dennis');
        console.log(encrypted);
    }
}

module.exports = Blowfish;
