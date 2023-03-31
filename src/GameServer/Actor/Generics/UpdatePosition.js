const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World/World');
const Formulas       = invoke('GameServer/Formulas');
const Database       = invoke('Database');

function updateNpcs(session, coords) {
    if (Formulas.calcDistance(this.previousXY?.locX ?? 0, this.previousXY?.locY ?? 0, coords.locX, coords.locY) < 1000) {
        return;
    }

    const npcs = World.npc.spawns.filter((ob) => Formulas.calcWithinRadius(coords.locX, coords.locY, ob.fetchLocX(), ob.fetchLocY(), 3500)) ?? [];
    npcs.forEach((npc) => { // Gives a sense of random NPC Animation to the actor
        setTimeout( () => { session.dataSend(ServerResponse.npcInfo(npc)); }, utils.randomNumber(1000));
    });

    this.previousXY = coords;
}

function updatePosition(session, actor, coords) {
    const Generics = invoke(path.actor);

    // TODO: Write less in DB about movement
    actor.setLocXYZH(coords);
    Database.updateCharacterLocation(actor.fetchId(), coords);

    // Render npcs found inside user's radius
    updateNpcs(session, coords);

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
