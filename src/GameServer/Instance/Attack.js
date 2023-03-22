const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World');
const ConsoleText    = invoke('GameServer/ConsoleText');
const Formulas       = invoke('GameServer/Formulas');

class Attack {
    constructor() {
        this.resetQueuedEvents();
    }

    destructor() {
        this.resetQueuedEvents();
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
        this.resetQueuedEvents();
    }

    resetQueuedEvents() {
        this.queue = { name: undefined, data: undefined };
    }

    meleeHit(session, npc) {
        const actor = session.actor;

        if (actor.state.fetchDead() || npc.state.fetchDead()) {
            actor.state.setHits(false);
            return;
        }

        const speed = Formulas.calcMeleeAtkTime(actor.fetchCollectiveAtkSpd());
        session.dataSend(ServerResponse.attack(actor, npc.fetchId()));
        actor.state.setHits(true);

        setTimeout(() => {
            if (actor.state.fetchDead() || npc.state.fetchDead()) {
                actor.state.setHits(false);
                return;
            }

            const pAtk  = actor.fetchCollectivePAtk();
            const pRand = actor.backpack.fetchTotalWeaponPAtkRnd() ?? 0;
            this.hit(session, actor, npc, Formulas.calcMeleeHit(pAtk, pRand, npc.fetchCollectivePDef()));

        }, speed * 0.644); // Until hit point

        setTimeout(() => {
            if (actor.state.fetchDead() || npc.state.fetchDead()) {
                actor.state.setHits(false);
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

        if (actor.state.fetchDead() || npc.state.fetchDead()) {
            actor.state.setCasts(false);
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
            if (actor.state.fetchDead() || npc.state.fetchDead()) {
                actor.state.setCasts(false);
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

    hit(session, actor, npc, hit) {
        npc.setHp(Math.max(0, npc.fetchHp() - hit)); // HP bar would disappear if less than zero
        npc.replenishVitals();

        actor.statusUpdateVitals(npc);
        ConsoleText.transmit(session, ConsoleText.caption.actorHit, [{ kind: ConsoleText.kind.number, value: hit }]);

        if (npc.fetchHp() <= 0) {
            actor.rewardExpAndSp(npc.fetchRewardExp(), npc.fetchRewardSp());
            World.removeNpc(session, npc);
            return;
        }

        npc.enterCombatState(session, actor);
    }
}

module.exports = Attack;
