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

    calcPAtk(level, str, wpnPAtk) {
        let levelMod = this.calcLevelMod(level);
        let strMod   = this.calcSTRMod(str);
        return Number((levelMod * strMod * wpnPAtk).toFixed(2));
    },

    calcMeleeHit(pAtk, pDef) {
        return Number(((77 * pAtk) / pDef).toFixed(2));
    }
};

module.exports = Formulas;
