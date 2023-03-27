const ServerResponse = invoke('GameServer/Network/Response');

function basicAction(session, actor, data) {
    if (actor.isDead()) {
        return;
    }

    switch (data.actionId) {
    case 0x00: // Sit / Stand
        if (actor.state.fetchHits() || actor.state.fetchCasts() || actor.state.fetchAnimated() || actor.state.inMotion()) {
            actor.queueRequest('sit', data);
            return;
        }

        actor.state.setAnimated(true);
        actor.state.setSeated(!actor.state.fetchSeated());
        session.dataSend(ServerResponse.sitAndStand(actor));

        setTimeout(() => {
            actor.state.setAnimated(false);
        }, 2500);
        break;

    case 0x01: // Walk / Run
        actor.state.setWalkin(!actor.state.fetchWalkin());
        session.dataSend(
            ServerResponse.walkAndRun(actor.fetchId(), actor.state.fetchWalkin() ? 0 : 1)
        );
        break;

    case 0x28: // Recommend without selection
        break;

    default:
        utils.infoWarn('GameServer :: unknown basic action 0x%s', utils.toHex(data.actionId));
        break;
    }
}

module.exports = basicAction;
