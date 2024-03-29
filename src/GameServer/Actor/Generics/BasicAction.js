const ServerResponse = invoke('GameServer/Network/Response');

function sitAndStand(session, actor, data) {
    if (actor.state.fetchHits() || actor.state.fetchCasts() || actor.state.fetchAnimated() || actor.state.inMotion()) {
        invoke(path.actor).queueRequest(session, actor, 'sit', data);
        return;
    }

    actor.state.setAnimated(true);
    actor.state.setSeated(!actor.state.fetchSeated());
    session.dataSendToMeAndOthers(ServerResponse.sitAndStand(actor), actor);

    setTimeout(() => {
        actor.state.setAnimated(false);
    }, 2500);
}

function walkAndRun(session, actor) {
    actor.state.setWalkin(!actor.state.fetchWalkin());
    session.dataSendToMeAndOthers(ServerResponse.walkAndRun(actor.fetchId(), actor.state.fetchWalkin() ? 0 : 1), actor);
}

function basicAction(session, actor, data) {
    if (actor.isDead()) {
        return;
    }

    switch (data.actionId) {
    case 0x00: // Sit / Stand
        sitAndStand(session, actor, data);
        break;

    case 0x01: // Walk / Run
        walkAndRun(session, actor);
        break;

    case 0x28: // Recommend without selection
        break;

    default:
        utils.infoWarn('GameServer', 'unknown basic action 0x%s', utils.toHex(data.actionId));
        break;
    }
}

module.exports = basicAction;
