const Formulas = invoke('GameServer/Formulas');

function setCollectiveTotalHp(actor) {
    const base = Formulas.calcHp(actor.fetchLevel(), actor.fetchClassId(), actor.fetchCon());
    actor.setMaxHp(base);
    actor.setHp(Math.min(actor.fetchHp(), actor.fetchMaxHp()));
}

function setCollectiveTotalMp(actor) { // TODO: Fix hardcoded class transfer parameter
    const base  = Formulas.calcMp(actor.fetchLevel(), actor.isSpellcaster(), 0, actor.fetchMen());
    const bonus = actor.backpack.fetchTotalArmorBonusMp();
    actor.setMaxMp(base + bonus);
    actor.setMp(Math.min(actor.fetchMp(), actor.fetchMaxMp()));
}

function setCollectiveTotalLoad(actor) {
    const base = Formulas.calcMaxLoad(actor.fetchCon());
    actor.setMaxLoad(base);
    actor.setLoad(actor.backpack.fetchTotalLoad());
}

function setCollectiveTotalPAtk(actor) {
    const pAtk = actor.backpack.fetchTotalWeaponPAtk() ?? actor.fetchPAtk();
    const base = Formulas.calcPAtk(actor.fetchLevel(), actor.fetchStr(), pAtk);
    actor.setCollectivePAtk(base);
}

function setCollectiveTotalMAtk(actor) {
    const mAtk = actor.backpack.fetchTotalWeaponMAtk() ?? actor.fetchMAtk();
    const base = Formulas.calcMAtk(actor.fetchLevel(), actor.fetchInt(), mAtk);
    actor.setCollectiveMAtk(base);
}

function setCollectiveTotalPDef(actor) {
    const pDef = actor.backpack.fetchTotalArmorPDef(actor.isSpellcaster()) ?? actor.fetchPDef();
    const base = Formulas.calcPDef(actor.fetchLevel(), pDef);
    actor.setCollectivePDef(base);
}

function setCollectiveTotalMDef(actor) {
    const mDef = actor.backpack.fetchTotalArmorMDef() ?? actor.fetchMDef();
    const base = Formulas.calcMDef(actor.fetchLevel(), actor.fetchMen(), mDef);
    actor.setCollectiveMDef(base);
}

function setCollectiveTotalAccur(actor) {
    const accur = actor.backpack.fetchTotalWeaponAccur() ?? actor.fetchAccur();
    const base  = Formulas.calcAccur(actor.fetchLevel(), actor.fetchDex(), accur);
    actor.setCollectiveAccur(base);
}

function setCollectiveTotalEvasion(actor) {
    const evasion = actor.backpack.fetchTotalArmorEvasion() ?? actor.fetchEvasion();
    const base    = Formulas.calcEvasion(actor.fetchLevel(), actor.fetchDex(), evasion);
    actor.setCollectiveEvasion(base);
}

function setCollectiveTotalCritical(actor) {
    const critical = actor.backpack.fetchTotalWeaponCritical() ?? actor.fetchCritical();
    const base    = Formulas.calcCritical(actor.fetchDex(), critical);
    actor.setCollectiveCritical(base);
}

function setCollectiveTotalAtkSpd(actor) {
    const atkSpd = actor.backpack.fetchTotalWeaponAtkSpd() ?? actor.fetchAtkSpd();
    const base   = Formulas.calcAtkSpd(actor.fetchDex(), atkSpd);
    actor.setCollectiveAtkSpd(base);
}

function setCollectiveTotalCastSpd(actor) {
    const base = Formulas.calcCastSpd(actor.fetchWit());
    actor.setCollectiveCastSpd(base);
}

function setCollectiveTotalWalkSpd(actor) {
    const base = Formulas.calcSpeed(actor.fetchDex());
    actor.setCollectiveWalkSpd(base);
}

function setCollectiveTotalRunSpd(actor) {
    const base = Formulas.calcSpeed(actor.fetchDex());
    actor.setCollectiveRunSpd(base);
}

function calculateStats(session, actor) {
    setCollectiveTotalHp      (actor);
    setCollectiveTotalMp      (actor);
    setCollectiveTotalLoad    (actor);
    setCollectiveTotalPAtk    (actor);
    setCollectiveTotalMAtk    (actor);
    setCollectiveTotalPDef    (actor);
    setCollectiveTotalMDef    (actor);
    setCollectiveTotalAccur   (actor);
    setCollectiveTotalEvasion (actor);
    setCollectiveTotalCritical(actor);
    setCollectiveTotalAtkSpd  (actor);
    setCollectiveTotalCastSpd (actor);
    setCollectiveTotalWalkSpd (actor);
    setCollectiveTotalRunSpd  (actor);
}

module.exports = calculateStats;
