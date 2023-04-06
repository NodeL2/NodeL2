const ServerResponse = invoke('GameServer/Network/Response');

function socialAction(session, actor, data) {
    if (actor.isDead() || actor.isBlocked() || actor.state.inMotion()) {
        return;
    }

    actor.automation.abortAll(actor);
    session.dataSend(ServerResponse.socialAction(actor.fetchId(), data.actionId), actor);
}

module.exports = socialAction;
