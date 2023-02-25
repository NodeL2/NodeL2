const Formulas = {
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
