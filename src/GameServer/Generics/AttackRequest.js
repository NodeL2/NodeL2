function attackRequest(session, actor, data) {
    if (actor.isDead()) {
        return;
    }

    if (actor.isBlocked()) {
        actor.queueRequest('attack', data);
        return;
    }

    if (actor.state.inMotion()) {
        if (actor.state.fetchTowards() === 'remote' || actor.fetchDestId() !== actor.automation.fetchDestId()) {
            actor.storedAttack = data;
            actor.requestStopAutomation();
            return;
        }
    }

    if (actor.state.fetchTowards() === 'melee') {
        return;
    }

    actor.storedAttack = data;
    actor.requestStopAutomation();
}

module.exports = attackRequest;
