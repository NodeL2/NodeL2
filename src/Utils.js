class Utils {
    static toHex(value, padding) {
        return Number(value).toString(16).padStart(padding, '0');
    }

    static toAsciiStripNull(value) {
        return value.toString('ascii').replace(/\u0000/gi, '');
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

    static isWithinRadius(x1, y1, x2, y2, radius) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        let sqrtDistance = (dx * dx) + (dy * dy);
        let sqrtRadius = radius * radius;

        return sqrtDistance < sqrtRadius;
    }
}

module.exports = Utils;
