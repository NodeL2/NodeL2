const ServerResponse = invoke('GameServer/Network/Response');

function die(session, actor) {
    if (actor.isDead()) {
        return;
    }

    actor.destructor();
    actor.state.setDead(true);
    session.dataSend(ServerResponse.die(actor.fetchId()));
}

module.exports = die;
