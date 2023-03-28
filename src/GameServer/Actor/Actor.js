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

        delete this.model.items;
        delete this.model.paperdoll;
    }

    destructor() {
        invoke('GameServer/Actor/Generics').unselect(
            this.session, this
        );

        invoke('GameServer/Actor/Generics').clearStoredActions(
            this.session, this
        );

        this.attack.destructor();
        this.automation.destructor(this);
    }

    // Request packets

    enterWorld() {
        invoke('GameServer/Actor/Generics').enterWorld(
            this.session, this
        );
    }

    select(data) {
        invoke('GameServer/Actor/Generics').select(
            this.session, this, data
        );
    }

    unselect() {
        invoke('GameServer/Actor/Generics').unselect(
            this.session, this
        );
    }

    moveTo(data) {
        invoke('GameServer/Actor/Generics').moveTo(
            this.session, this, data
        );
    }

    updatePosition(data) {
        invoke('GameServer/Actor/Generics').updatePosition(
            this.session, this, data
        );
    }

    basicAction(data) {
        invoke('GameServer/Actor/Generics').basicAction(
            this.session, this, data
        );
    }

    socialAction(data) {
        invoke('GameServer/Actor/Generics').socialAction(
            this.session, this, data
        );
    }

    skillRequest(data) {
        invoke('GameServer/Actor/Generics').skillRequest(
            this.session, this, data
        );
    }

    revive() {
        invoke('GameServer/Actor/Generics').revive(
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
