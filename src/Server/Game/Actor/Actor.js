const ServerResponse = invoke('Server/Game/Network/Response');
const Creature       = invoke('Server/Game/Creature/Creature');
const Backpack       = invoke('Server/Game/Actor/Backpack');
const Paperdoll      = invoke('Server/Game/Actor/Paperdoll');
const Database       = invoke('Server/Database');

class Actor extends Creature {
    constructor(data) {
        // Parent inheritance
        super(data);

        this.backpack  = new Backpack (data.items);
        this.paperdoll = new Paperdoll(data.paperdoll);

        delete this.model.items;
        delete this.model.paperdoll;
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

    // Abstract

    moveTo(session, coords) {
        session.dataSend(
            ServerResponse.moveToLocation(this.fetchId(), coords)
        );
    }

    updatePosition(coords) {
        this.setLocXYZH(coords);
        Database.updateCharacterLocation(this.fetchId(), coords);
    }

    select(session, data) {
        if (data.actionId !== 0) {
            utils.infoWarn('GameServer:: shift + select unimplemented');
            return;
        }

        if (this.fetchId() === data.destId) { // Click on self
            this.unselect(session);
            session.dataSend(ServerResponse.destSelected(data.destId));
            return;
        }
        else {
            utils.infoFail('GameServer:: further selection unimplemented');
        }
    }

    unselect(session) {
        session.dataSend(
            ServerResponse.destDeselected(this)
        );
    }

    requestedSkillAction(session, data) {
        if (this.state.fetchProcedure() || this.state.fetchSeated()) {
            return;
        }

        session.dataSend(
            ServerResponse.skillStarted(this, data)
        );
    }

    basicAction(session, data) {
        if (data.shift || data.ctrl) {
            utils.infoWarn('GameServer:: shift and ctrl unimplemented');
            return;
        }

        switch (data.actionId) {
        case 0x00: // Sit / Stand
            if (this.state.fetchProcedure()) {
                return;
            }

            this.state.setProcedure(true);
            this.state.setSeated(!this.state.fetchSeated());
            session.dataSend(ServerResponse.sitAndStand(this));

            setTimeout(() => {
                this.state.setProcedure(false);
            }, 2000); // TODO: How to calculate this, based on what?
            break;

        case 0x01: // Walk / Run
            this.state.setWalkin(!this.state.fetchWalkin());
            session.dataSend(
                ServerResponse.walkAndRun(this)
            );
            break;

        case 0x28: // Recommend without selection (0xb9 when self is selected...)
            break;

        default:
            utils.infoWarn('GameServer:: unknown basic action 0x%s', utils.toHex(data.actionId));
            break;
        }
    }

    socialAction(session, actionId) {
        if (this.state.fetchProcedure() || this.state.fetchSeated()) {
            return;
        }

        session.dataSend(
            ServerResponse.socialAction(this.fetchId(), actionId)
        );
    }
}

module.exports = Actor;
