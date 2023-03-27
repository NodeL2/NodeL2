const ServerResponse = invoke('GameServer/Network/Response');

function moveTo(session, actor, coords) {
    if (actor.isDead()) {
        return;
    }

    if (actor.isBlocked()) {
        actor.queueRequest('move', coords);
        return;
    }

    // Abort scheduled movement, user redirected the actor
    actor.automation.abortAll(actor);
    session.dataSend(ServerResponse.moveToLocation(actor.fetchId(), coords));
}

module.exports = moveTo;
