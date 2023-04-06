const ServerResponse = invoke('GameServer/Network/Response');

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
    session.dataSendToMeAndOthers(ServerResponse.moveToLocation(actor.fetchId(), coords), actor);
}

module.exports = moveTo;
