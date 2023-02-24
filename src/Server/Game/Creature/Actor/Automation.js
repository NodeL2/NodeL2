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

    attackOnce(session, npcId) {
        World.fetchNpcWithId(npcId).then((npc) => {
            if (npc.fetchHp() === 0) {
                return;
            }

            const speed = 500000 / session.actor.fetchAtkSpd();
            session.dataSend(ServerResponse.attack(session.actor, npcId));
            session.actor.state.setCombats(true);

            setTimeout(() => {
                this.hit(session, npc, 15);
            }, speed * 0.644); // Until hit point

            setTimeout(() => {
                session.actor.state.setCombats(false);
            }, speed); // Until end of combat

        }).catch((e) => { // ?
            utils.infoWarn('GameServer:: problem attack ' + e);
        });
    }

    cast(session, npcId, data) {
        World.fetchNpcWithId(npcId).then((npc) => {
            if (npc.fetchHp() === 0) {
                return;
            }

            session.actor.abortScheduleTimer();
            session.dataSend(ServerResponse.skillStarted(session.actor, npcId, data));
            session.actor.state.setCasts(true);

            setTimeout(() => {
                this.hit(session, npc, 30);
                session.actor.state.setCasts(false);
            }, data.hitTime);

            setTimeout(() => {
            }, data.resuseTime);

        }).catch((e) => { // ?
            utils.infoWarn('GameServer:: problem cast ' + e);
        });
    }
}

module.exports = Automation;
