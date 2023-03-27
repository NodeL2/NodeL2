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
        invoke('GameServer/Generics').unselect(this.session, this);
        this.clearStoredActions();
        this.attack.destructor();
        this.automation.destructor(this);
    }

    clearStoredActions() {
        this.storedAttack = undefined;
        this.storedSpell  = undefined;
        this.storedPickup = undefined;
    }

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
