const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World/World');
const Formulas       = invoke('GameServer/Formulas');

function moveTo(session, actor, coords) {
    if (actor.isDead()) {
        return;
    }

    if (actor.isBlocked()) {
        invoke(path.actor).queueRequest(session, actor, 'move', coords);
        return;
    }

    // Abort scheduled movement, user redirected the actor
    actor.automation.abortAll(actor);
    session.dataSend(ServerResponse.moveToLocation(actor.fetchId(), coords));

    const sessions = World.user.sessions.filter((ob) => Formulas.calcWithinRadius(coords.from.locX, coords.from.locY, ob.actor?.fetchLocX(), ob.actor?.fetchLocY(), 5000)) ?? [];
    sessions.forEach((user) => {
        if (user !== session) {
            user.dataSend(ServerResponse.moveToLocation(actor.fetchId(), coords));
        }
    });
}

module.exports = moveTo;
