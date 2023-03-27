function pickupRequest(session, actor, data) {
    if (actor.isDead()) {
        return;
    }

    if (actor.isBlocked()) {
        actor.queueRequest('pickup', data);
        return;
    }

    if (actor.state.fetchTowards() === 'pickup') {
        return;
    }

    actor.storedPickup = data;
    actor.requestStopAutomation();
}

module.exports = pickupRequest;
