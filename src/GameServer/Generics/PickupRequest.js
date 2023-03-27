function pickupRequest(session, actor, data) {
    const Generics = invoke('GameServer/Generics');

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
    Generics.stopAutomation(session, actor);
}

module.exports = pickupRequest;
