const Formulas = invoke('GameServer/Formulas');

function broadcastVitals(npc) {
    const actors = invoke('GameServer/World/World').user.sessions.filter((ob) => npc.fetchId() === ob.actor?.fetchDestId() && Formulas.calcWithinRadius(npc.fetchLocX(), npc.fetchLocY(), ob.actor?.fetchLocX(), ob.actor?.fetchLocY(), 3500)) ?? [];

    actors.forEach((session) => {
        session.actor.statusUpdateVitals(npc);
    });
}

module.exports = broadcastVitals;
