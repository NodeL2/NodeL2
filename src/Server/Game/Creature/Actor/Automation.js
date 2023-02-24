const ServerResponse = invoke('Server/Game/Network/Response');
const World          = invoke('Server/Game/World');

class Automation {
    attackOnce(session, npcId) {
        World.fetchNpcWithId(npcId).then((npc) => {
            if (npc.fetchHp() === 0) {
                return;
            }

            const speed = 500000 / session.actor.fetchAtkSpd();
            session.dataSend(ServerResponse.attack(session.actor, npcId));
            session.actor.state.setCombats(true);

            setTimeout(() => {
                const hit = 15 + Math.floor(utils.randomNumber(10));
                npc.setHp(Math.max(0, npc.fetchHp() - hit)); // HP bar would disappear if less than zero

                session.dataSend(ServerResponse.statusUpdate(npc));
                session.dataSend(ServerResponse.consoleText(35, hit));

                // Death
                if (npc.fetchHp() === 0) {
                    World.removeNpcWithId(session, npcId);
                }
            }, speed * 0.644); // Until hit point

            setTimeout(() => {
                session.actor.state.setCombats(false);
            }, speed); // Until end of combat

        }).catch((e) => { // ?
            utils.infoWarn('GameServer:: sometinwon ' + e);
        });
    }
}

module.exports = Automation;
