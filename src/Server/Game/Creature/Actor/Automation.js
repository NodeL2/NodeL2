const ServerResponse = invoke('Server/Game/Network/Response');
const World          = invoke('Server/Game/World');

class Automation {
    attackOnce(session, npcId) {
        World.fetchNpcWithId(npcId).then((npc) => {
            const speed = 500000 / session.actor.fetchAtkSpd();
            session.dataSend(ServerResponse.attack(session.actor, npc.fetchId()));
            session.actor.state.setCombats(true);

            setTimeout(() => {
                session.dataSend(ServerResponse.consoleText(35, 1337));
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
