const ServerResponse = invoke('Server/Game/Network/Response');
const World          = invoke('Server/Game/World');
const Creature       = invoke('Server/Game/Creature/Creature');
const Automation     = invoke('Server/Game/Creature/Actor/Automation');
const Backpack       = invoke('Server/Game/Creature/Actor/Backpack');
const Paperdoll      = invoke('Server/Game/Creature/Actor/Paperdoll');
const Database       = invoke('Server/Database');

class Actor extends Creature {
    constructor(data) {
        // Parent inheritance
        super(data);

        // Specific
        this.npcId = undefined;
        this.createAdditionals(data);
    }

    createAdditionals(data) {
        this.automation = new Automation();
        this.backpack   = new Backpack  (data.items);
        this.paperdoll  = new Paperdoll (data.paperdoll);

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
        if (this.state.fetchCombats() || this.state.fetchOccupied() || this.state.fetchSeated()) {
            session.dataSend(ServerResponse.actionFailed());
            return;
        }

        // TODO: Well... this needs rework, to remember the scheduled action in some respect
        this.abortScheduleTimer();

        session.dataSend(
            ServerResponse.moveToLocation(this.fetchId(), coords)
        );
    }

    updatePosition(coords) {
        this.setLocXYZH(coords);
        Database.updateCharacterLocation(this.fetchId(), coords);
    }

    select(session, data) {
        if (this.fetchId() === data.id) { // Click on self
            this.unselect(session);
            session.dataSend(ServerResponse.destSelected(data.id));
            return;
        }

        World.fetchNpcWithId(data.id).then((npc) => { // Npc selected
            if (npc.fetchId() !== this.npcId) { // First click on Npc
                this.npcId = npc.fetchId();
                session.dataSend(ServerResponse.destSelected(this.npcId));
                session.dataSend(ServerResponse.statusUpdate(npc));
            }
            else { // Second click on same Npc
                if (this.state.fetchCombats() || this.state.fetchOccupied() || this.state.fetchSeated()) {
                    session.dataSend(ServerResponse.actionFailed());
                    return;
                }

                this.scheduleArrival(session, this, npc, 20, () => {
                    if (npc.fetchAttackable()) {
                        this.automation.attackOnce(session, this.npcId);
                    }
                    else {
                        session.dataSend(
                            ServerResponse.npcHtml(npc.fetchId(), utils.parseRawFile('data/Html/Default/7370.html'))
                        );
                    }
                });
            }
        }).catch((e) => { // Pickup item
            utils.infoWarn('GameServer:: further selection unimplemented ' + e);
        });
    }

    unselect(session) {
        this.npcId = undefined;
        session.dataSend(ServerResponse.destDeselected(this));
    }

    requestedSkillAction(session, data) {
        if (this.npcId === undefined) {
            return;
        }

        if (this.state.fetchCombats() || this.state.fetchOccupied() || this.state.fetchSeated()) {
            return;
        }

        // TODO: Well... this needs rework, to remember the scheduled action in some respect
        this.abortScheduleTimer();

        session.dataSend(
            ServerResponse.skillStarted(this, this.npcId, data)
        );
    }

    basicAction(session, data) {
        if (this.state.fetchOnTheMove()) {
            return;
        }

        switch (data.actionId) {
        case 0x00: // Sit / Stand
            if (this.state.fetchOccupied()) {
                return;
            }

            this.state.setOccupied(true);
            this.state.setSeated(!this.state.fetchSeated());
            session.dataSend(ServerResponse.sitAndStand(this));

            setTimeout(() => {
                this.state.setOccupied(false);
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
        if (this.state.fetchOnTheMove() || this.state.fetchCombats() || this.state.fetchOccupied() || this.state.fetchSeated()) {
            return;
        }

        // TODO: Well... this needs rework, to remember the scheduled action in some respect
        this.abortScheduleTimer();

        session.dataSend(
            ServerResponse.socialAction(this.fetchId(), actionId)
        );
    }

    unstuck(session) {
        if (this.state.fetchCombats() || this.state.fetchOccupied() || this.state.fetchSeated()) {
            return;
        }

        // TODO: Well... this needs rework, to remember the scheduled action in some respect
        this.abortScheduleTimer();

        const coords = {
            locX: 80304, locY: 56241, locZ: -1500, head: this.fetchHead()
        };

        session.dataSend(ServerResponse.teleportToLocation(this.fetchId(), coords));

        // TODO: Hide this from the world, soon. Utter stupid.
        setTimeout(() => {
            this.updatePosition(coords);
        });
    }
}

module.exports = Actor;
