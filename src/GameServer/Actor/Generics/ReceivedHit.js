function receivedHit(session, actor, hit) {
    const Generics = invoke(path.actor);

    actor.setHp(Math.max(0, actor.fetchHp() - hit)); // HP bar would disappear if less than zero
    actor.statusUpdateVitals(actor);

    // On hit, actor should stand-up
    if (actor.state.fetchSeated()) {
        Generics.basicAction(session, actor, { actionId: 0 });
    }

    // Bummer
    if (actor.fetchHp() <= 0) {
        Generics.die(session, actor);
        return;
    }

    actor.automation.replenishVitals(actor);
    Generics.enterCombatState(session, actor);
}

module.exports = receivedHit;
