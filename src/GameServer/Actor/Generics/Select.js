const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World/World');

function select(session, actor, data) {
    const Generics = invoke('GameServer/Actor/Generics');

    if (actor.fetchId() === data.id) { // Click on self
        actor.setDestId(actor.fetchId());
        session.dataSend(ServerResponse.destSelected(actor.fetchId(), actor.fetchDestId()));
        return;
    }

    World.fetchNpc(data.id).then((npc) => {
        if (npc.fetchId() !== actor.fetchDestId()) { // First click on a Creature
            actor.setDestId(npc.fetchId());
            session.dataSend(ServerResponse.destSelected(actor.fetchId(), actor.fetchDestId()));
            actor.statusUpdateVitals(npc);
        }
        else { // Second click on same Creature
            Generics.attackRequest(session, actor, data);
        }
    }).catch(() => {
        World.fetchItem(data.id).then(() => {
            Generics.pickupRequest(session, actor, data);
        }).catch(() => {
            utils.infoWarn('GameServer', 'unknown World Id %d', data.id);
        });
    });
}

module.exports = select;
