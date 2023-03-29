const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World/World');

function pickupExec(session, actor, data) {
    World.fetchItem(data.id).then((item) => {
        actor.automation.schedulePickup(session, actor, item, () => {
            actor.state.setPickinUp(true);
            session.dataSend(ServerResponse.pickupItem(actor.fetchId(), item));

            setTimeout(() => {
                World.pickupItem(session, actor, item);
            }, 250);

            setTimeout(() => {
                actor.state.setPickinUp(false);
            }, 500);
        });
    }).catch((err) => {
        utils.infoWarn('GameServer', 'Pickup -> ' + err);
    });
}

module.exports = pickupExec;
