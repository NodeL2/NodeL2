const ServerResponse = invoke('Server/Game/Network/Response');
const World          = invoke('Server/Game/World');

class Automation {
    attackOnce(session, npcId) {
        World.fetchNpcWithId(npcId).then((npc) => {
            session.dataSend(ServerResponse.attack(session.actor, npc.fetchId()));
            session.dataSend(ServerResponse.consoleText(35, 1337));
        }).catch((e) => { // ?
            utils.infoWarn('GameServer:: sometinwon ' + e);
        });
    }
}

module.exports = Automation;
