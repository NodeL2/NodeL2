const ServerResponse = invoke('GameServer/Network/Response');

function abortCombatState(session, actor) {
    actor.clearDestId();
    actor.state.setCombats(false);
    actor.automation.destructor(actor);

    session.dataSend(ServerResponse.autoAttackStop(actor.fetchId()));
}

module.exports = abortCombatState;
