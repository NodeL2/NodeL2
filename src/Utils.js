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

    static isWithinRadius(x, y, centerX, centerY, radius) {
        let dx = x - centerX;
        let dy = y - centerY;
        let sqrtDistance = (dx * dx) + (dy * dy);
        let sqrtRadius = radius * radius;

        return sqrtDistance < sqrtRadius;
    }

    static distance(x, y, centerX, centerY) {
        let dx = x - centerX;
        let dy = y - centerY;

        return (dx * dx) + (dy * dy);
    }
}

module.exports = Utils;
