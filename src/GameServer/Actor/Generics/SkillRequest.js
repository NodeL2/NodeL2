function skillRequest(session, actor, data) {
    const Generics = invoke('GameServer/Actor/Generics');

    if (actor.isDead()) {
        return;
    }

    if ((data.id = actor.fetchDestId()) === undefined) {
        return;
    }

    if (actor.isBlocked()) {
        Generics.queueRequest(session, actor, 'skill', data);
        return;
    }

    if (actor.state.inMotion()) {
        if (actor.state.fetchTowards() === 'melee' || actor.fetchDestId() !== actor.automation.fetchDestId()) {
            actor.storedSpell = data;
            Generics.stopAutomation(session, actor);
            return;
        }
    }

    if (actor.state.fetchTowards() === 'remote') {
        return;
    }

    actor.storedSpell = data;
    Generics.stopAutomation(session, actor);
}

module.exports = skillRequest;
