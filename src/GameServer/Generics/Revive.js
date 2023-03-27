const ServerResponse = invoke('GameServer/Network/Response');

function revive(session, actor) {
    session.dataSend(ServerResponse.revive(actor.fetchId()));
    actor.automation.replenishVitals(actor);

    setTimeout(() => {
        actor.state.setDead(false);
        actor.socialAction(9); // SWAG stand-up
    }, 2500);
}

module.exports = revive;
