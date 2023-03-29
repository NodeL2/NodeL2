const ServerResponse = invoke('GameServer/Network/Response');
const ActorModel     = invoke('GameServer/Model/Actor');
const Attack         = invoke('GameServer/Actor/Attack');
const Skillset       = invoke('GameServer/Actor/Skillset');
const Backpack       = invoke('GameServer/Actor/Backpack');
const Automation     = invoke('GameServer/Automation');

class Actor extends ActorModel {
    constructor(session, data) {
        // Parent inheritance
        super(data);

        // Local
        this.skillset   = new Skillset();
        this.backpack   = new Backpack(data);
        this.attack     = new Attack();
        this.automation = new Automation();

        this.session    = session;
        this.previousXY = undefined;

        delete this.model.items;
        delete this.model.paperdoll;
    }

    destructor() {
        invoke(path.actor).unselect(
            this.session, this
        );

        invoke(path.actor).clearStoredActions(
            this.session, this
        );

        this.attack.destructor();
        this.automation.destructor(this);
    }

    // Request packets

    enterWorld() {
        invoke(path.actor).enterWorld(
            this.session, this
        );
    }

    select(data) {
        invoke(path.actor).select(
            this.session, this, data
        );
    }

    unselect() {
        invoke(path.actor).unselect(
            this.session, this
        );
    }

    moveTo(data) {
        invoke(path.actor).moveTo(
            this.session, this, data
        );
    }

    updatePosition(data) {
        invoke(path.actor).updatePosition(
            this.session, this, data
        );
    }

    basicAction(data) {
        invoke(path.actor).basicAction(
            this.session, this, data
        );
    }

    socialAction(data) {
        invoke(path.actor).socialAction(
            this.session, this, data
        );
    }

    skillRequest(data) {
        invoke(path.actor).skillRequest(
            this.session, this, data
        );
    }

    revive() {
        invoke(path.actor).revive(
            this.session, this
        );
    }

    // Abstract

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
}

module.exports = Actor;
