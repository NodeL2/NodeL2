const ServerResponse = invoke('GameServer/Network/Response');

function socialAction(session, actor, actionId) {
    if (actor.isDead() || actor.isBlocked() || actor.state.inMotion()) {
        return;
    }

    actor.automation.abortAll(actor);
    session.dataSend(ServerResponse.socialAction(actor.fetchId(), actionId));
}

module.exports = socialAction;
