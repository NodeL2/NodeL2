const ServerResponse = invoke('GameServer/Network/Response');

function enterCombatState(session, actor) {
    if (actor.state.fetchCombats()) {
        return;
    }

    actor.state.setCombats(true);
    session.dataSend(ServerResponse.autoAttackStart(actor.fetchId()), actor);
}

module.exports = enterCombatState;
