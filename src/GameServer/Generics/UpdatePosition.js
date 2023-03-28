const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World');
const Formulas       = invoke('GameServer/Formulas');
const Database       = invoke('Database');

function updatePosition(session, actor, coords) {
    const Generics = invoke('GameServer/Generics');

    // TODO: Write less in DB about movement
    actor.setLocXYZH(coords);
    Database.updateCharacterLocation(actor.fetchId(), coords);

    // Render npcs found inside user's radius
    const inRadiusNpcs = World.npc.spawns.filter(ob => Formulas.calcWithinRadius(coords.locX, coords.locY, ob.fetchLocX(), ob.fetchLocY(), 3500)) ?? [];
    inRadiusNpcs.forEach((npc) => {
        session.dataSend(ServerResponse.npcInfo(npc));
    });

    // Reschedule actions based on updated position
    if (actor.storedAttack) {
        Generics.attackExec(session, actor, structuredClone(actor.storedAttack));
        Generics.clearStoredActions(session, actor);
    }

    if (actor.storedSpell) {
        Generics. skillExec(session, actor, structuredClone(actor.storedSpell ));
        Generics.clearStoredActions(session, actor);
    }

    if (actor.storedPickup) {
        Generics.pickupExec(session, actor, structuredClone(actor.storedPickup));
        Generics.clearStoredActions(session, actor);
    }
}

module.exports = updatePosition;
