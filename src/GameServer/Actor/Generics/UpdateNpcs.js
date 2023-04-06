const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World/World');
const SpeckMath      = invoke('GameServer/SpeckMath');

function updateNpcs(session, actor, coords) {
    const npcs = World.npc.spawns.filter((ob) => !ob.state.fetchDead() && new SpeckMath.Circle(coords.locX, coords.locY, 5000).contains(new SpeckMath.Point(ob.fetchLocX(), ob.fetchLocY()))) ?? [];
    npcs.forEach((npc) => { // Gives a sense of random NPC Animation to the actor
        setTimeout(() => { session.dataSend(ServerResponse.npcInfo(npc)); }, utils.randomNumber(2000));
    });

    const sessions = World.user.sessions.filter((ob) => new SpeckMath.Circle(coords.locX, coords.locY, 5000).contains(new SpeckMath.Point(ob.actor?.fetchLocX(), ob.actor?.fetchLocY()))) ?? [];
    sessions.forEach((user) => {
        if (user !== session) {
            //console.info('You are ' + actor.fetchName() + ', and there is a character with name ' + user.actor.fetchName());
            session.dataSend(ServerResponse.charInfo(user.actor));
        }
    });

    actor.previousXY = coords;
}

module.exports = updateNpcs;
