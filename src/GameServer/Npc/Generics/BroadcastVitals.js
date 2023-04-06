const SpeckMath = invoke('GameServer/SpeckMath');

function broadcastVitals(npc) {
    const actors = invoke('GameServer/World/World').user.sessions.filter((ob) => npc.fetchId() === ob.actor?.fetchDestId() && new SpeckMath.Circle(npc.fetchLocX(), npc.fetchLocY(), 3500).contains(new SpeckMath.Point(ob.actor?.fetchLocX(), ob.actor?.fetchLocY()))) ?? [];

    actors.forEach((session) => {
        session.actor.statusUpdateVitals(npc);
    });
}

module.exports = broadcastVitals;
