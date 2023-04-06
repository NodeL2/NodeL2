const ServerResponse = invoke('GameServer/Network/Response');

function revive(session, actor) {
    session.dataSendToMeAndOthers(ServerResponse.revive(actor.fetchId()), actor);
    actor.automation.replenishVitals(actor);

    setTimeout(() => {
        actor.state.setDead(false);
        session.dataSendToMeAndOthers(ServerResponse.socialAction(actor.fetchId(), 9), actor); // SWAG stand-up
    }, 2500);
}

module.exports = revive;
