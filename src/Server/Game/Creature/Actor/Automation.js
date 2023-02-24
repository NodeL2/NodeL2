const ServerResponse = invoke('Server/Game/Network/Response');
const World          = invoke('Server/Game/World');

class Automation {
    hit(session, npc, power) {
        const hit = power + Math.floor(utils.randomNumber(10));
        npc.setHp(Math.max(0, npc.fetchHp() - hit)); // HP bar would disappear if less than zero

        session.dataSend(ServerResponse.statusUpdate(npc));
        session.dataSend(ServerResponse.consoleText(35, hit));

        // Death
        if (npc.fetchHp() === 0) {
            World.removeNpcWithId(session, npc.fetchId());
        }
    }

    meleeHit(session, npc) {
        if (npc.fetchHp() === 0) {
            return;
        }

        const speed = 500000 / session.actor.fetchAtkSpd();
        session.dataSend(ServerResponse.attack(session.actor, npc.fetchId()));
        session.actor.state.setCombats(true);

        setTimeout(() => {
            this.hit(session, npc, 15);
        }, speed * 0.644); // Until hit point

        setTimeout(() => {
            session.actor.state.setCombats(false);
        }, speed); // Until end of combat
    }

    remoteHit(session, npc, data) {
        if (npc.fetchHp() === 0) {
            return;
        }

        session.actor.abortScheduleTimer();
        session.dataSend(ServerResponse.skillStarted(session.actor, npc.fetchId(), data));
        session.actor.state.setCasts(true);

        setTimeout(() => {
            this.hit(session, npc, 30);
            session.actor.state.setCasts(false);
        }, data.hitTime);

        setTimeout(() => {
        }, data.resuseTime);
    }
}

module.exports = Automation;
