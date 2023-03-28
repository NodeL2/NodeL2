function clearStoredActions(session, actor) {
    actor.storedAttack = undefined;
    actor.storedSpell  = undefined;
    actor.storedPickup = undefined;
}

module.exports = clearStoredActions;
