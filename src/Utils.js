class Utils {
    static toHex(value, padding) {
        return Number(value).toString(16).padStart(padding, '0');
    }

    static toAsciiStripNull(value) {
        return value.toString().replace(/\u0000/gi, '');
    }

    static matchSessionKeys(pair1, pair2) {
        return (pair1.sessionKey1 === pair2.sessionKey1) && (pair1.sessionKey2 === pair2.sessionKey2);
    }

    static fetchIPv4Address() {
        let network = require('os').networkInterfaces();
        let ipv4 = network['en0'].filter(item => item.family === 'IPv4');
        return ipv4[0].address;
    }

    static createRandomNumber(limit) {
        return Math.floor(Math.random() * limit);
    }

    static createRandomCoordinates(centerX, centerY, radius) {
        const r = radius * Math.sqrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;

        return {
            x: centerX + r * Math.cos(theta),
            y: centerY + r * Math.sin(theta),
        };
    }

    static replaceSQLParams(text) {
        return text.replace(/\$\w+/gi, '?');
    }
}

module.exports = Utils;
