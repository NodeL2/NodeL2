const Formulas = {
    hpTable: (() => {
        const table = utils.tupleAlloc(100, (level) => {
            utils.infoFail('GameServer:: unknown hp table');
        });

        function hp(level, a, b, c, d) {
            return ((Math.pow(level, 2) *  a) + (level * b) +  c) / d;
        }

        table[ 0] = (level) => { return hp(level, 13, 2327, 13660, 200); };
        table[ 8] = (level) => { return hp(level, 17, 3043, 17140, 200); };
        table[18] = (level) => { return hp(level,  7, 1253,  7640, 100); };
        table[25] = (level) => { return hp(level, 17, 3043, 17740, 200); };
        table[31] = (level) => { return hp(level,  3,  537,  3220,  40); };
        table[38] = (level) => { return hp(level, 17, 3043, 18140, 200); };
        table[44] = (level) => { return hp(level,  7, 1253,  6740, 100); };
        table[49] = (level) => { return hp(level, 17, 3043, 15940, 200); };
        table[53] = (level) => { return hp(level,  7, 1253,  6740, 100); };

        return table;
    })(),

    calcDistance(srcX, srcY, destX, destY) {
        const dX = destX - srcX;
        const dY = destY - srcY;
        return Math.sqrt((dX * dX) + (dY * dY));
    },

    calcWithinRadius(srcX, srcY, destX, destY, radius) {
        const dX = destX - srcX;
        const dY = destY - srcY;
        return ((dX ** 2) + (dY ** 2)) < (radius ** 2);
    },

    calcLevelMod(level) {
        return Number(((level + 89) / 100).toFixed(2));
    },

    calcSTRMod(str) {
        let base = 0.30;
        let multiplier = 0.036219821012;
        for (let i = 1; i < str; i++, base += (base * multiplier));
        return Number(base.toFixed(2));
    },

    calcINTMod(int) {
        let base = 0.61;
        let multiplier = 0.019828637467;
        for (let i = 6; i < int; i++, base += (base * multiplier));
        return Number(base.toFixed(2));
    },

    calcPAtk(level, str, wpnPAtk) {
        let levelMod = this.calcLevelMod(level);
        let strMod   = this.calcSTRMod(str);
        return Number((levelMod * strMod * wpnPAtk).toFixed(2));
    },

    calcMAtk(level, int, wpnMAtk) {
        let levelMod = Math.pow(this.calcLevelMod(level), 2);
        let intMod   = Math.pow(this.calcINTMod(int), 2);
        return Number((levelMod * intMod * wpnMAtk).toFixed(2));
    },

    calcMeleeHit(pAtk, pDef) {
        return Number(((77 * pAtk) / pDef).toFixed(2));
    },

    calcRemoteHit(mAtk, power, mDef) {
        return Number(((91 * Math.sqrt(mAtk) * power) / mDef).toFixed(2));
    }
};

module.exports = Formulas;
