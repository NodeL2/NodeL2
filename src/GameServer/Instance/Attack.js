const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World');
const ConsoleText    = invoke('GameServer/ConsoleText');
const Formulas       = invoke('GameServer/Formulas');

class Attack {
    meleeHit(session, npc) {
        const actor = session.actor;

        if (npc.isDead()) {
            return;
        }

        const speed = 500000 / actor.fetchCollectiveAtkSpd();
        session.dataSend(ServerResponse.attack(actor, npc.fetchId()));
        actor.state.setCombats(true);

        setTimeout(() => {
            this.hitPoint(session, npc, true);
        }, speed * 0.644); // Until hit point

        setTimeout(() => {
            actor.state.setCombats(false);
        }, speed); // Until end of combat
    }

    remoteHit(session, npc, data) {
        const actor = session.actor;

        if (npc.isDead()) {
            return;
        }

        if (actor.fetchMp() < data.fetchConsumedMp()) {
            ConsoleText.transmit(session, ConsoleText.caption.depletedMp);
            return;
        }

        session.dataSend(ServerResponse.skillStarted(actor, npc.fetchId(), data));
        session.dataSend(ServerResponse.skillDurationBar(data.fetchHitTime()));
        actor.state.setCasts(true);

        setTimeout(() => {
            actor.setMp(actor.fetchMp() - data.fetchConsumedMp());
            actor.statusUpdateVitals(session, actor);
            this.hitPoint(session, npc, false);
            actor.state.setCasts(false);

            // Start replenish
            actor.automation.replenishVitals(session, actor);

        }, data.fetchHitTime());

        setTimeout(() => {
            // TODO: Prohibit same skill use before reuse time
        }, data.fetchReuseTime());
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

    hitPAtk(actor, npc) { // TODO: Calculate weapon random hit
        const pAtk = actor.fetchCollectivePAtk();
        return Formulas.calcMeleeHit(pAtk, npc.fetchPDef());
    }

    hitMAtk(actor, npc) {
        const mAtk = actor.fetchCollectiveMAtk();
        return Formulas.calcRemoteHit(mAtk, 12, npc.fetchMDef());
    }
}

module.exports = Attack;
