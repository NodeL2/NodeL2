const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World');
const ConsoleText    = invoke('GameServer/ConsoleText');
const Formulas       = invoke('GameServer/Formulas');

class Attack {
    constructor() {
        this.resetQueuedEvents();
    }

    // Queue mechanism

    queueEvent(name, data) {
        this.queue.name = name;
        this.queue.data = data;
    }

    dequeueEvent(session) {
        let actor = session.actor;
        actor.state.setCombats(false);

        switch (this.queue.name) {
            case 'move'   : actor.moveTo     (session, this.queue.data); break;
            case 'attack' : actor.select     (session, this.queue.data); break;
            case 'spell'  : actor.skillAction(session, this.queue.data); break;
            case 'pickup' : actor.select     (session, this.queue.data); break;
            case 'sit'    : actor.basicAction(session, this.queue.data); break;
        }
        this.resetQueuedEvents();
    }

    resetQueuedEvents() {
        this.queue = { name: undefined, data: undefined };
    }

    meleeHit(session, npc) {
        const actor = session.actor;

        if (npc.isDead()) {
            actor.state.setCombats(false);
            return;
        }

        const speed = Formulas.calcMeleeAtkTime(actor.fetchCollectiveAtkSpd());
        session.dataSend(ServerResponse.attack(actor, npc.fetchId()));
        actor.state.setCombats(true);

        setTimeout(() => {
            this.hitPoint(session, npc, true);
        }, speed * 0.644); // Until hit point

        setTimeout(() => {
            if (this.queue.name) {
                this.dequeueEvent(session);
                return;
            }
            this.meleeHit(session, npc);

        }, speed); // Until end of combat move
    }

    remoteHit(session, npc, skill) {
        const actor = session.actor;

        if (npc.isDead()) {
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
            actor.setMp(actor.fetchMp() - skill.fetchConsumedMp());
            actor.statusUpdateVitals(session, actor);
            this.hitPoint(session, npc, false);
            actor.state.setCasts(false);

            // Start replenish
            actor.automation.replenishVitals(session, actor);

        }, skill.fetchCalculatedHitTime());

        setTimeout(() => {
            // TODO: Prohibit same skill use before reuse time
        }, skill.fetchReuseTime());
    }

    hitPoint(session, npc, melee) {
        const power = melee ? this.hitPAtk(session.actor, npc) : this.hitMAtk(session.actor, npc);
        npc.setHp(Math.max(0, npc.fetchHp() - power)); // HP bar would disappear if less than zero

        session.actor.statusUpdateVitals(session, npc);
        ConsoleText.transmit(session, ConsoleText.caption.actorHit, [{ kind: ConsoleText.kind.number, value: power }]);

        if (npc.isDead()) {
            session.actor.rewardExpAndSp(session, npc.fetchRewardExp(), npc.fetchRewardSp());
            World.removeNpc(session, npc);
        }

        session.dataSend(ServerResponse.attack(npc, session.actor.fetchId()));
    }

    hitPAtk(actor, npc) {
        const pAtk = actor.fetchCollectivePAtk();
        const pAtkRnd = actor.backpack.fetchTotalWeaponPAtkRnd();
        return Formulas.calcMeleeHit(pAtk, pAtkRnd, npc.fetchPDef());
    }

    hitMAtk(actor, npc) {
        const mAtk = actor.fetchCollectiveMAtk();
        return Formulas.calcRemoteHit(mAtk, 12, npc.fetchMDef());
    }
}

module.exports = Attack;
