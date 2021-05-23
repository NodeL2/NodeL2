class Utils {
    static toHex(value, padding) {
        return Number(value).toString(16).padStart(padding, '0');
    }

    static toAsciiStripNull(value) {
        return value.toString('ascii').replace(/\u0000/gi, '');
    }
}

module.exports = Utils;
