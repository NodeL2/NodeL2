const CreatureModel = invoke('GameServer/Model/Creature');

class ActorModel extends CreatureModel {

    // Set

    setExp(data) {
        this.model.exp = data;
    }

    setSp(data) {
        this.model.sp = data;
    }

    setExpSp(exp, sp) {
        this.setExp(exp);
        this.setSp ( sp);
    }

    // Get

    fetchUsername() {
        return this.model.username;
    }

    fetchClassId() {
        return this.model.classId;
    }

    fetchRace() {
        return this.model.race;
    }

    fetchExp() {
        return this.model.exp;
    }

    fetchSp() {
        return this.model.sp;
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

    fetchEvasion() {
        return this.model.evasion;
    }

    fetchAccur() {
        return this.model.accur;
    }

    fetchCrit() {
        return this.model.crit;
    }

    fetchSpeed() {
        return this.model.speed;
    }

    fetchLoad() { // TODO: Not in structure. Add it!
        return this.model.load;
    }

    fetchMaxLoad() {
        return this.model.maxLoad;
    }

    fetchSwim() {
        return this.model.swim;
    }
    
    fetchPvp() {
        return this.model.pvp;
    }

    fetchPk() {
        return this.model.pk;
    }

    fetchSex() {
        return this.model.sex;
    }

    fetchFace() {
        return this.model.face;
    }

    fetchHair() {
        return this.model.hair;
    }

    fetchHairColor() {
        return this.model.hairColor;
    }

    fetchKarma() {
        return this.model.karma;
    }

    fetchEvalScore() {
        return this.model.evalScore;
    }

    fetchRecRemain() {
        return this.model.recRemain;
    }

    fetchIsCrafter() {
        return this.model.crafter;
    }

    fetchIsGM() {
        return this.model.isGM;
    }

    fetchIsOnline() {
        return this.model.isOnline;
    }

    fetchIsActive() {
        return this.model.isActive;
    }
}

module.exports = ActorModel;
