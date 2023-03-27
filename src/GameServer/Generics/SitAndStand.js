const ServerResponse = invoke('GameServer/Network/Response');

function sitAndStand(session, actor, data) {
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
}

module.exports = sitAndStand;
