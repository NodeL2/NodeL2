const ServerResponse = invoke('GameServer/Network/Response');

function teleportTo(session, actor, coords) {
    if (actor.isDead() || actor.isBlocked()) {
        return;
    }

    actor.automation.abortAll(actor);
    session.dataSend(ServerResponse.teleportToLocation(actor.fetchId(), coords));

    // Turns out to be a viable solution
    setTimeout(() => {
        invoke(path.actor).updatePosition(session, actor, coords);
    }, 1000);
}

module.exports = teleportTo;
