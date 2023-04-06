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

    meleeHit(session, npc) {
        const actor = session.actor;

        if (this.checkParticipants(actor, npc)) {
            return;
        }

        const speed = Formulas.calcMeleeAtkTime(actor.fetchCollectiveAtkSpd());
        const hitLanded = Formulas.calcHitChance();
        session.dataSendToMeAndOthers(ServerResponse.attack(actor, npc.fetchId(), hitLanded ? 0x00 : 0x80), actor);
        actor.state.setHits(true);

        setTimeout(() => {
            if (this.checkParticipants(actor, npc)) {
                return;
            }

            if (hitLanded) {
                const pAtk  = actor.fetchCollectivePAtk();
                const pRand = actor.backpack.fetchTotalWeaponPAtkRnd() ?? 0;
                this.hit(session, actor, npc, Formulas.calcMeleeHit(pAtk, pRand, npc.fetchCollectivePDef()));
            }
            else {
                ConsoleText.transmit(session, ConsoleText.caption.missedHit);
            }

        }, speed * 0.644); // Until hit point

        setTimeout(() => {
            if (this.checkParticipants(actor, npc)) {
                return;
            }

            if (this.queue.name) {
                this.dequeueEvent(session);
                return;
            }

            this.meleeHit(session, npc);

        }, speed); // Until end of combat move
    }

    remoteHit(session, npc, skill) {
        const actor = session.actor;

        if (this.checkParticipants(actor, npc)) {
            return;
        }

        if (actor.fetchMp() < skill.fetchConsumedMp()) {
            ConsoleText.transmit(session, ConsoleText.caption.depletedMp);
            return;
        }

        skill.setCalculatedHitTime(Formulas.calcRemoteAtkTime(skill.fetchHitTime(), actor.fetchCollectiveCastSpd()));
        session.dataSendToMeAndOthers(ServerResponse.skillStarted(actor, npc.fetchId(), skill), actor);
        session.dataSendToMe(ServerResponse.skillDurationBar(skill.fetchCalculatedHitTime()));
        actor.state.setCasts(true);

        setTimeout(() => {
            if (this.checkParticipants(actor, npc)) {
                return;
            }

            actor.setMp(actor.fetchMp() - skill.fetchConsumedMp());
            actor.statusUpdateVitals(actor);

            const mAtk = actor.fetchCollectiveMAtk();
            this.hit(session, actor, npc, Formulas.calcRemoteHit(mAtk, skill.fetchPower(), npc.fetchCollectiveMDef()));
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

    hit(session, actor, npc, hit) {
        ConsoleText.transmit(session, ConsoleText.caption.actorHit, [{ kind: ConsoleText.kind.number, value: hit }]);
        invoke(path.npc).receivedHit(session, actor, npc, hit);
    }
}

module.exports = Attack;
