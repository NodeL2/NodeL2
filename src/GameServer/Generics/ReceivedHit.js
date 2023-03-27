function receivedHit(session, actor, hit) {
    actor.setHp(Math.max(0, actor.fetchHp() - hit)); // HP bar would disappear if less than zero
    actor.statusUpdateVitals(actor);

    // On hit, actor should stand-up
    if (actor.state.fetchSeated()) {
        actor.basicAction({ actionId: 0 });
    }

    // Bummer
    if (actor.fetchHp() <= 0) {
        invoke('GameServer/Generics').die(session, actor);
        return;
    }

    actor.automation.replenishVitals(actor);
    invoke('GameServer/Generics').enterCombatState(session, actor);
}

module.exports = receivedHit;
