const ServerResponse = invoke('GameServer/Network/Response');

function abortCombatState(session, actor) {
    actor.state.setCombats(false);
    actor.automation.abortAll(actor);
    session.dataSendToMeAndOthers(ServerResponse.autoAttackStop(actor.fetchId()), actor);
}

module.exports = abortCombatState;
