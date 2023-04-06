const ServerResponse = invoke('GameServer/Network/Response');

function die(session, actor) {
    if (actor.isDead()) {
        return;
    }

    actor.destructor();
    actor.state.setDead(true);
    session.dataSendToMeAndOthers(ServerResponse.die(actor.fetchId()), actor);
}

module.exports = die;
