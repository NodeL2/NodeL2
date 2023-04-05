const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World/World');
const Formulas       = invoke('GameServer/Formulas');

function updateNpcs(session, actor, coords) {
    const npcs = World.npc.spawns.filter((ob) => !ob.state.fetchDead() && Formulas.calcWithinRadius(coords.locX, coords.locY, ob.fetchLocX(), ob.fetchLocY(), 5000)) ?? [];
    npcs.forEach((npc) => { // Gives a sense of random NPC Animation to the actor
        setTimeout( () => { session.dataSend(ServerResponse.npcInfo(npc)); }, utils.randomNumber(2000));
    });

    actor.previousXY = coords;
}

module.exports = updateNpcs;
