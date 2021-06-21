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
}

module.exports = Utils;
