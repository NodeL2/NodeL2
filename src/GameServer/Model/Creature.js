const StateModel = invoke('GameServer/Model/State');

class CreatureModel {
    constructor(data) {
        this.model = data;
        this.state = new StateModel();
    }

    // Set

    setId(data) {
        this.model.id = data;
    }

    setTitle(data) {
        this.model.title = data;
    }

    setLevel(data) {
        this.model.level = data;
    }

    setHp(data) {
        this.model.hp = data;
    }

    setMaxHp(data) {
        this.model.maxHp = data;
    }

    setMp(data) {
        this.model.mp = data;
    }

    setMaxMp(data) {
        this.model.maxMp = data;
    }

    setLocX(data) {
        this.model.locX = data;
    }

    setLocY(data) {
        this.model.locY = data;
    }

    setLocZ(data) {
        this.model.locZ = data;
    }

    setHead(data) {
        this.model.head = data;
    }

    setLocXYZH(coords) {
        this.setLocX(coords.locX);
        this.setLocY(coords.locY);
        this.setLocZ(coords.locZ);
        this.setHead(coords.head);
    }

    setCollectivePAtk(data) {
        this.model.collectivePAtk = data;
    }

    setCollectiveMAtk(data) {
        this.model.collectiveMAtk = data;
    }

    setCollectivePDef(data) {
        this.model.collectivePDef = data;
    }

    setCollectiveMDef(data) {
        this.model.collectiveMDef = data;
    }

    setCollectiveAtkSpd(data) {
        this.model.collectiveAtkSpd = data;
    }

    setCollectiveCastSpd(data) {
        this.model.collectiveCastSpd = data;
    }

    // Get

    fetchId() {
        return this.model.id;
    }

    fetchName() {
        return this.model.name;
    }

    fetchTitle() {
        return this.model.title;
    }

    fetchLevel() {
        return this.model.level;
    }

    fetchHp() {
        return this.model.hp;
    }

    fetchMaxHp() {
        return this.model.maxHp;
    }

    fetchMp() {
        return this.model.mp;
    }

    fetchMaxMp() {
        return this.model.maxMp;
    }

    fetchStr() {
        return this.model.str;
    }

    fetchDex() {
        return this.model.dex;
    }

    fetchCon() {
        return this.model.con;
    }

    fetchInt() {
        return this.model.int;
    }

    fetchWit() {
        return this.model.wit;
    }

    fetchMen() {
        return this.model.men;
    }

    fetchPAtk() {
        return this.model.pAtk;
    }

    fetchCollectivePAtk() {
        return this.model.collectivePAtk ?? this.fetchPAtk();
    }

    fetchMAtk() {
        return this.model.mAtk;
    }

    fetchCollectiveMAtk() {
        return this.model.collectiveMAtk ?? this.fetchMAtk();
    }

    fetchPDef() {
        return this.model.pDef;
    }

    fetchCollectivePDef() {
        return this.model.collectivePDef ?? this.fetchPAtk();
    }

    fetchMDef() {
        return this.model.mDef;
    }

    fetchCollectiveMDef() {
        return this.model.collectiveMDef ?? this.fetchMDef();
    }

    fetchAtkSpd() {
        return this.model.atkSpd;
    }

    fetchCollectiveAtkSpd() {
        return this.model.collectiveAtkSpd ?? this.fetchAtkSpd();
    }

    fetchCastSpd() {
        return this.model.castSpd;
    }

    fetchCollectiveCastSpd() {
        return this.model.collectiveCastSpd ?? this.fetchCastSpd();
    }

    fetchWalk() {
        return this.model.walk;
    }

    fetchRun() {
        return this.model.run;
    }

    fetchRadius() {
        return this.model.radius;
    }

    fetchSize() {
        return this.model.size;
    }

    fetchLocX() {
        return this.model.locX;
    }

    fetchLocY() {
        return this.model.locY;
    }

    fetchLocZ() {
        return this.model.locZ;
    }

    fetchHead() {
        return this.model.head;
    }

    // Abstract

    fillupHp() {
        this.setHp(this.fetchMaxHp());
    }

    fillupMp() {
        this.setMp(this.fetchMaxMp());
    }

    fillupVitals() {
        this.fillupHp();
        this.fillupMp();
    }

    isDead() { // TODO: Remember that this is not true in case of Bleed or similar skill effect
        return this.model.hp <= 0;
    }
}

module.exports = CreatureModel;
