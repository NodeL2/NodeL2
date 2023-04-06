const ServerResponse = invoke('GameServer/Network/Response');
const ConsoleText    = invoke('GameServer/ConsoleText');
const Formulas       = invoke('GameServer/Formulas');

class Attack {
    constructor() {
        this.resetQueuedEvent();
    }

    destructor() {
        this.resetQueuedEvent();
    }

    // Queue mechanism

    queueEvent(name, data) {
        this.queue.name = name;
        this.queue.data = data;
    }

    dequeueEvent(session) {
        const Generics = invoke(path.actor);

        let actor = session.actor;
        let queue = this.queue;
        actor.state.setHits(false);

        switch (queue.name) {
            case 'move'   : Generics.moveTo       (session, actor, queue.data); break;
            case 'attack' : Generics.attackRequest(session, actor, queue.data); break;
            case 'skill'  : Generics.skillRequest (session, actor, queue.data); break;
            case 'pickup' : Generics.pickupRequest(session, actor, queue.data); break;
            case 'sit'    : Generics.basicAction  (session, actor, queue.data); break;
        }
        this.resetQueuedEvent();
    }

    resetQueuedEvent() {
        this.queue = { name: undefined, data: undefined };
    }

    meleeHit(session, creature) {
        const actor = session.actor;

        if (this.checkParticipants(actor, creature)) {
            return;
        }

        const speed = Formulas.calcMeleeAtkTime(actor.fetchCollectiveAtkSpd());
        const hitLanded = Formulas.calcHitChance();
        session.dataSendToMeAndOthers(ServerResponse.attack(actor, creature.fetchId(), hitLanded ? 0x00 : 0x80), actor);
        actor.state.setHits(true);

        setTimeout(() => {
            if (this.checkParticipants(actor, creature)) {
                return;
            }

            if (hitLanded) {
                const pAtk  = actor.fetchCollectivePAtk();
                const pRand = actor.backpack.fetchTotalWeaponPAtkRnd() ?? 0;
                this.hit(session, actor, creature, Formulas.calcMeleeHit(pAtk, pRand, creature.fetchCollectivePDef()));
            }
            else {
                ConsoleText.transmit(session, ConsoleText.caption.missedHit);
            }

        }, speed * 0.644); // Until hit point

        setTimeout(() => {
            if (this.checkParticipants(actor, creature)) {
                return;
            }

            if (this.queue.name) {
                this.dequeueEvent(session);
                return;
            }

            this.meleeHit(session, creature);

        }, speed); // Until end of combat move
    }

    remoteHit(session, creature, skill) {
        const actor = session.actor;

        if (this.checkParticipants(actor, creature)) {
            return;
        }

        if (actor.fetchMp() < skill.fetchConsumedMp()) {
            ConsoleText.transmit(session, ConsoleText.caption.depletedMp);
            return;
        }

        skill.setCalculatedHitTime(Formulas.calcRemoteAtkTime(skill.fetchHitTime(), actor.fetchCollectiveCastSpd()));
        session.dataSendToMeAndOthers(ServerResponse.skillStarted(actor, creature.fetchId(), skill), actor);
        session.dataSendToMe(ServerResponse.skillDurationBar(skill.fetchCalculatedHitTime()));
        actor.state.setCasts(true);

        setTimeout(() => {
            if (this.checkParticipants(actor, creature)) {
                return;
            }

            actor.setMp(actor.fetchMp() - skill.fetchConsumedMp());
            actor.statusUpdateVitals(actor);

            const mAtk = actor.fetchCollectiveMAtk();
            this.hit(session, actor, creature, Formulas.calcRemoteHit(mAtk, skill.fetchPower(), creature.fetchCollectiveMDef()));
            actor.state.setCasts(false);

            // Start replenish
            actor.automation.replenishVitals(actor);

            if (this.queue.name) {
                this.dequeueEvent(session);
                return;
            }

        }, skill.fetchCalculatedHitTime());

        setTimeout(() => {
            // TODO: Prohibit same skill use before reuse time
        }, skill.fetchReuseTime());
    }

    checkParticipants(src, dst) {
        if (src.state.fetchDead() || dst.state.fetchDead()) {
            this.resetQueuedEvent();
            src.state.setHits (false);
            src.state.setCasts(false);
            invoke(path.actor).abortCombatState(src.session, src);
            return true;
        }
        return false;
    }

    hit(session, actor, creature, hit) {
        ConsoleText.transmit(session, ConsoleText.caption.actorHit, [{ kind: ConsoleText.kind.number, value: hit }]);

        if (creature.fetchId() >= 2000000) {
            invoke(path.actor).receivedHit(session, creature, hit);
        }
        else {
            invoke(path.npc).receivedHit(session, actor, creature, hit);
        }
    }
}

module.exports = Attack;
