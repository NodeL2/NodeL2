function pickupRequest(session, actor, data) {
    const Generics = invoke(path.actor);

    if (actor.isDead()) {
        return;
    }

    if (actor.isBlocked()) {
        Generics.queueRequest(session, actor, 'pickup', data);
        return;
    }

    if (actor.state.fetchTowards() === 'pickup') {
        return;
    }

    actor.storedPickup = data;
    Generics.stopAutomation(session, actor);
}

module.exports = pickupRequest;
