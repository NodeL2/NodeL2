const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World/World');
const SpeckMath      = invoke('GameServer/SpeckMath');

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

    const sessions = World.user.sessions.filter((ob) => new SpeckMath.Circle(coords.from.locX, coords.from.locY, 5000).contains(new SpeckMath.Point(ob.actor?.fetchLocX(), ob.actor?.fetchLocY()))) ?? [];
    sessions.forEach((user) => {
        if (user !== session) {
            user.dataSend(ServerResponse.moveToLocation(actor.fetchId(), coords));
        }
    });
}

module.exports = moveTo;
