function skillRequest(session, actor, data) {
    if (actor.isDead()) {
        return;
    }

    if ((data.id = actor.fetchDestId()) === undefined) {
        return;
    }

    if (actor.isBlocked()) {
        actor.queueRequest('spell', data);
        return;
    }

    if (actor.state.inMotion()) {
        if (actor.state.fetchTowards() === 'melee' || actor.fetchDestId() !== actor.automation.fetchDestId()) {
            actor.storedSpell = data;
            actor.requestStopAutomation();
            return;
        }
    }

    if (actor.state.fetchTowards() === 'remote') {
        return;
    }

    actor.storedSpell = data;
    actor.requestStopAutomation();
}

module.exports = skillRequest;
