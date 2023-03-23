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
        let actor = session.actor;
        let queue = this.queue;
        actor.state.setHits(false);

        switch (queue.name) {
            case 'move'   : actor.moveTo       (queue.data); break;
            case 'attack' : actor.attackRequest(queue.data); break;
            case 'spell'  : actor.skillRequest (queue.data); break;
            case 'pickup' : actor.pickupRequest(queue.data); break;
            case 'sit'    : actor.basicAction  (queue.data); break;
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
        session.dataSend(ServerResponse.attack(actor, npc.fetchId(), hitLanded ? 0x00 : 0x80));
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
        session.dataSend(ServerResponse.skillStarted(actor, npc.fetchId(), skill));
        session.dataSend(ServerResponse.skillDurationBar(skill.fetchCalculatedHitTime()));
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
            actor.automation.replenishVitals(session, actor);

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
            return true;
        }
        return false;
    }

    hit(session, actor, npc, hit) {
        ConsoleText.transmit(session, ConsoleText.caption.actorHit, [{ kind: ConsoleText.kind.number, value: hit }]);
        npc.hitReceived(session, actor, hit);
    }
}

module.exports = Attack;
