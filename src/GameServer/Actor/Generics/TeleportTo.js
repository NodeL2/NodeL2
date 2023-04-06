const ServerResponse = invoke('GameServer/Network/Response');

function teleportTo(session, actor, coords) {
    const Generics = invoke(path.actor);

    if (actor.isDead() || actor.isBlocked()) {
        return;
    }

    actor.clearDestId();
    actor.automation.abortAll(actor);
    session.dataSendToMeAndOthers(ServerResponse.teleportToLocation(actor.fetchId(), coords), actor);

    // Turns out to be a viable solution
    setTimeout(() => {
        Generics.updatePosition(session, actor, coords);
        Generics.updateEnvironment(session, actor); // Force update position, in case we Teleport to the same Location
    }, 1000);
}

module.exports = teleportTo;
