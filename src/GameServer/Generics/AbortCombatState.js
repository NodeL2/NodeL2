const ServerResponse = invoke('GameServer/Network/Response');

function abortCombatState(session, actor) {
    actor.clearDestId();
    actor.automation.abortAll(actor);

    actor.state.setCombats(false);
    session.dataSend(ServerResponse.autoAttackStop(actor.fetchId()));
}

module.exports = abortCombatState;
