const ServerResponse = invoke('GameServer/Network/Response');
const ActorModel     = invoke('GameServer/Model/Actor');
const Automation     = invoke('GameServer/Instance/Automation');
const Attack         = invoke('GameServer/Instance/Attack');
const Skillset       = invoke('GameServer/Instance/Skillset');
const Backpack       = invoke('GameServer/Instance/Backpack');

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
        invoke('GameServer/Generics').unselect(
            this.session, this
        );

        invoke('GameServer/Generics').clearStoredActions(
            this.session, this
        );

        this.attack.destructor();
        this.automation.destructor(this);
    }

    // Request packets

    enterWorld() {
        invoke('GameServer/Generics').enterWorld(
            this.session, this
        );
    }

    select(data) {
        invoke('GameServer/Generics').select(
            this.session, this, data
        );
    }

    unselect() {
        invoke('GameServer/Generics').unselect(
            this.session, this
        );
    }

    moveTo(data) {
        invoke('GameServer/Generics').moveTo(
            this.session, this, data
        );
    }

    updatePosition(data) {
        invoke('GameServer/Generics').updatePosition(
            this.session, this, data
        );
    }

    basicAction(data) {
        invoke('GameServer/Generics').basicAction(
            this.session, this, data
        );
    }

    socialAction(data) {
        invoke('GameServer/Generics').socialAction(
            this.session, this, data
        );
    }

    skillRequest(data) {
        invoke('GameServer/Generics').skillRequest(
            this.session, this, data
        );
    }

    revive() {
        invoke('GameServer/Generics').revive(
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
