const Formulas = {
    calcBaseHp: (() => {
        const table = utils.tupleAlloc(100, (level) => {
            utils.infoFail('GameServer', 'unknown HP Table for Level %d', level);
        });

        function hp(level, a, b, c, d) {
            return ((Math.pow(level, 2) *  a) + (level * b) +  c) / d;
        }

        table[ 0] = (level) => { return hp(level, 13, 2327, 13660, 200); };
        table[10] = (level) => { return hp(level, 17, 3043, 17140, 200); };
        table[18] = (level) => { return hp(level,  7, 1253,  7640, 100); };
        table[25] = (level) => { return hp(level, 17, 3043, 17740, 200); };
        table[31] = (level) => { return hp(level,  3,  537,  3220,  40); };
        table[38] = (level) => { return hp(level, 17, 3043, 18140, 200); };
        table[44] = (level) => { return hp(level,  7, 1253,  6740, 100); };
        table[49] = (level) => { return hp(level, 17, 3043, 15940, 200); };
        table[53] = (level) => { return hp(level,  7, 1253,  6740, 100); };

        return table;
    })(),

    calcBaseMp: (() => {
        const table = utils.tupleAlloc(3, (level) => {
            utils.infoFail('GameServer', 'unknown MP Table for Level %d', level);
        });

        function mp(level, a, b, c, d) {
            return ((Math.pow(level, 2) *  a) + (level * b) +  c) / d;
        }

        table[0] = [ // 1st class transfer
            (level) => { return mp(level, 3, 537, 2460, 100); }, // F
            (level) => { return mp(level, 1, 179,  820,  25); }, // M
        ];

        return table;
    })(),

    calcBaseMod: (() => {
        function func(start, end, base, multiplier) {
            for (let i = start; i < end; i++, base += (base * multiplier));
            return base;
        }

        return {
            STR: (data) => { return func( 1, data, 0.30, 0.036219821012); },
            DEX: (data) => { return func(21, data, 1.01, 0.009553766764); },
            CON: (data) => { return func( 1, data, 0.46, 0.029863478935); },
            INT: (data) => { return func( 6, data, 0.61, 0.019828637467); },
            WIT: (data) => { return func( 0, data, 0.40, 0.049719998399); },
            MEN: (data) => { return func(25, data, 1.28, 0.010330633552); },
        };
    })(),

    calcHp(level, classId, con) {
        return this.calcBaseHp[classId](level) * this.calcBaseMod.CON(con);
    },

    calcMp(level, kind, classTransfer, men) {
        return this.calcBaseMp[classTransfer][kind](level) * this.calcBaseMod.MEN(men);
    },

    calcMaxLoad(con) {
        return this.calcBaseMod.CON(con) * 69000;
    },

    calcLevelMod(level) {
        return (level + 89) / 100;
    },

    calcPAtk(level, str, wpnPAtk) {
        let levelMod = this.calcLevelMod(level);
        let strMod   = this.calcBaseMod.STR(str);
        return levelMod * strMod * wpnPAtk;
    },

    calcMAtk(level, int, wpnMAtk) {
        let levelMod = Math.pow(this.calcLevelMod(level), 2);
        let intMod   = Math.pow(this.calcBaseMod.INT(int), 2);
        return levelMod * intMod * wpnMAtk;
    },

    calcPDef(level, armPDef) {
        let levelMod = this.calcLevelMod(level);
        return levelMod * (armPDef + 4);
    },

    calcMDef(level, men, armMDef) {
        let levelMod = this.calcLevelMod(level);
        let menMod   = this.calcBaseMod.MEN(men);
        return levelMod * menMod * armMDef;
    },

    calcAccur(level, dex, wpnAccur) {
        return (utils.sqrt(dex) * 6) + level + wpnAccur;
    },

    calcEvasion(level, dex, armEvasion) {
        return (utils.sqrt(dex) * 6) + level + armEvasion;
    },

    calcCritical(dex, wpnCrit) {
        let dexMod = this.calcBaseMod.DEX(dex);
        return dexMod * wpnCrit;
    },

    calcAtkSpd(dex, wpnAtkSpd) {
        let dexMod = this.calcBaseMod.DEX(dex);
        return dexMod * wpnAtkSpd;
    },

    calcAtkSpdMultiplier(atkSpd, calculatedAtkSpd) {
        return (1.1 * calculatedAtkSpd) / atkSpd;
    },

    calcCastSpd(wit) {
        let witMod = this.calcBaseMod.WIT(wit);
        return 333 * witMod;
    },

    calcSpeed(dex, speed) {
        let dexMod = this.calcBaseMod.DEX(dex);
        return dexMod * speed;
    },

    calcMeleeAtkTime(atkSpd) {
        return 500000 / atkSpd;
    },

    calcRemoteAtkTime(time, castSpd) {
        return  (time / castSpd) * 333;
    },

    calcMeleeHit(pAtk, pAtkRnd, pDef) {
        const pAtkRndMul = 1 + (utils.oneFromSpan(-pAtkRnd, pAtkRnd) / 100);
        return (77 * pAtk * pAtkRndMul) / pDef;
    },

    calcRemoteHit(mAtk, power, mDef) {
        return (91 * utils.sqrt(mAtk) * power) / mDef;
    },

    calcHitChance() { // TODO: This is faked for now
        return Math.random() <= 90.0 / 100.0;
    },

    calcDistance(srcX, srcY, destX, destY) {
        const dX = destX - srcX;
        const dY = destY - srcY;
        return utils.sqrt((dX ** 2) + (dY ** 2));
    },

    calcDistance3D(srcX, srcY, srcZ, destX, destY, destZ) {
        const dX = destX - srcX;
        const dY = destY - srcY;
        const dZ = destZ - srcZ;
        return utils.sqrt((dX ** 2) + (dY ** 2) + (dZ ** 2));
    },

    createRandomCoordinates(centerX, centerY, radius) {
        const r = radius * utils.sqrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;

        return {
            locX: centerX + r * Math.cos(theta),
            locY: centerY + r * Math.sin(theta),
        };
    },

    calcWithinRadius(srcX, srcY, destX, destY, radius) {
        const dX = destX - srcX;
        const dY = destY - srcY;
        return ((dX ** 2) + (dY ** 2)) < (radius ** 2);
    },

    calcMidPointCoordinates(srcX, srcY, srcZ, destX, destY, destZ, t) {
        return {
            locX: ((1 - t) * srcX) + (t * destX),
            locY: ((1 - t) * srcY) + (t * destY),
            locZ: ((1 - t) * srcZ) + (t * destZ),
        };
    },

    createRandomVertexPosition(coords) {
        return require('random-position-in-polygon')({
            type: "Feature",
            properties: {},
            geometry: {
                type: "Polygon",
                coordinates: [coords]
            }
        });
    }
};

module.exports = Formulas;
