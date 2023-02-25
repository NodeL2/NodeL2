const ServerResponse = invoke('Server/Game/Network/Response');
const World          = invoke('Server/Game/World');
const Formulas       = invoke('Server/Game/Formulas');

class Automation {
    meleeHit(session, npc) {
        if (npc.isDead()) {
            return;
        }

        const speed = 500000 / session.actor.fetchAtkSpd();
        session.dataSend(ServerResponse.attack(session.actor, npc.fetchId()));
        session.actor.state.setCombats(true);

        setTimeout(() => {
            this.hitPoint(session, npc, true);
        }, speed * 0.644); // Until hit point

        setTimeout(() => {
            session.actor.state.setCombats(false);
        }, speed); // Until end of combat
    }

    remoteHit(session, npc, data) {
        if (npc.isDead()) {
            return;
        }

        if (session.actor.fetchMp() < data.mp) {
            session.dataSend(ServerResponse.consoleText(24));
            return;
        }

        session.actor.abortScheduleTimer();
        session.dataSend(ServerResponse.skillStarted(session.actor, npc.fetchId(), data));
        session.actor.state.setCasts(true);

        setTimeout(() => {
            session.actor.setMp(session.actor.fetchMp() - data.mp);
            session.actor.statusUpdateVitals(session, session.actor);
            this.hitPoint(session, npc, false);
            session.actor.state.setCasts(false);

        }, data.hitTime);

        setTimeout(() => {
            // TODO: Prohibit same skill use before reuse time
        }, data.resuseTime);
    }

    hitPoint(session, npc, melee) {
        const power = melee ? this.hitPAtk(session.actor, npc) : this.hitMAtk(session.actor, npc);
        npc.setHp(Math.max(0, npc.fetchHp() - power)); // HP bar would disappear if less than zero

        session.actor.statusUpdateVitals(session, npc);
        session.dataSend(ServerResponse.consoleText(35, [{ value: power }]));

        if (npc.isDead()) {
            World.removeNpc(session, npc);
        }
    }

    hitPAtk(actor, npc) {
        const wpnPAtk = actor.fetchEquippedWeapon()?.pAtk ?? actor.fetchPAtk();
        const pAtk = Formulas.calcPAtk(actor.fetchLevel(), actor.fetchStr(), wpnPAtk);
        return Formulas.calcMeleeHit(pAtk, npc.fetchPDef());
    }

    hitMAtk(actor, npc) {
        const wpnMAtk = actor.fetchEquippedWeapon()?.mAtk ?? actor.fetchMAtk();
        const mAtk = Formulas.calcMAtk(actor.fetchLevel(), actor.fetchInt(), wpnMAtk);
        return Formulas.calcRemoteHit(mAtk, 12, npc.fetchMDef());
    }

    replenishMp(session) {
        clearInterval(this.timerMp);
        this.timerMp = setInterval(() => {
            const value = session.actor.fetchMp() + 3;
            const max   = session.actor.fetchMaxMp();

            session.actor.setMp(Math.min(value, max));
            session.actor.statusUpdateVitals(session, session.actor);
        }, 3500);
    }
}

module.exports = Automation;
