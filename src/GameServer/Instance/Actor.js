const ServerResponse = invoke('GameServer/Network/Response');
const ActorModel     = invoke('GameServer/Model/Actor');
const Automation     = invoke('GameServer/Instance/Automation');
const Attack         = invoke('GameServer/Instance/Attack');
const Skillset       = invoke('GameServer/Instance/Skillset');
const Backpack       = invoke('GameServer/Instance/Backpack');
const World          = invoke('GameServer/World');
const Formulas       = invoke('GameServer/Formulas');

class Actor extends ActorModel {
    constructor(session, data) {
        // Parent inheritance
        super(data);

        // Local
        this.automation = new Automation();
        this.attack     = new Attack();
        this.skillset   = new Skillset();
        this.backpack   = new Backpack(data);
        this.session    = session;

        delete this.model.items;
        delete this.model.paperdoll;
    }

    destructor() {
        invoke('GameServer/Generics').unselect(this.session, this);
        this.clearStoredActions();
        this.attack.destructor();
        this.automation.destructor(this);
    }

    queueRequest(event, data) {
        if (this.state.fetchHits() || this.state.fetchCasts()) {
            this.attack.queueEvent(event, data);
        }
    }

    clearStoredActions() {
        this.storedAttack = undefined;
        this.storedSpell  = undefined;
        this.storedPickup = undefined;
    }

    requestStopAutomation() {
        this.automation.abortAll(this);

        this.session.dataSend(
            ServerResponse.stopMove(this.fetchId(), {
                locX: this.fetchLocX(),
                locY: this.fetchLocY(),
                locZ: this.fetchLocZ(),
                head: this.fetchHead(),
            })
        );
    }

    npcDied(npc) {
        World.removeNpc(this.session, npc);

        if (this.isDead() === false) {
            invoke('GameServer/Generics').experienceReward(this.session, this, npc.fetchRewardExp(), npc.fetchRewardSp());
        }
    }

    // State

    isBlocked() {
        if (this.state.isBlocked()) {
            this.session.dataSend(ServerResponse.actionFailed());
            return true;
        }
        return false;
    }

    isDead() {
        if (this.state.fetchDead()) {
            this.session.dataSend(ServerResponse.actionFailed());
            return true;
        }
        return false;
    }

    // Update stats

    statusUpdateLevelExpSp(creature) {
        this.session.dataSend(
            ServerResponse.statusUpdate(creature.fetchId(), [
                { id: 0x1, value: creature.fetchLevel() },
                { id: 0x2, value: creature.fetchExp  () },
                { id: 0xd, value: creature.fetchSp   () },
            ])
        );
    }

    statusUpdateVitals(creature) {
        this.session.dataSend(
            ServerResponse.statusUpdate(creature.fetchId(), [
                { id: 0x9, value: creature.fetchHp   () },
                { id: 0xa, value: creature.fetchMaxHp() },
                { id: 0xb, value: creature.fetchMp   () },
                { id: 0xc, value: creature.fetchMaxMp() },
            ])
        );
    }

    statusUpdateStats(creature) {
        this.session.dataSend(
            ServerResponse.statusUpdate(creature.fetchId(), [
                { id: 0x11, value: creature.fetchCollectivePAtk  () },
                { id: 0x17, value: creature.fetchCollectiveMAtk  () },
                { id: 0x12, value: creature.fetchCollectiveAtkSpd() },
            ])
        );
    }
}

module.exports = Actor;
