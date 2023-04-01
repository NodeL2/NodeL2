const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World/World');

function select(session, actor, data) {
    const Generics = invoke(path.actor);

    if (actor.fetchId() === data.id) { // Click on self
        actor.setDestId(actor.fetchId());
        session.dataSend(ServerResponse.destSelected(actor.fetchDestId()));
        return;
    }

    World.fetchNpc(data.id).then((npc) => {
        if (npc.fetchId() !== actor.fetchDestId()) { // First click on a Creature
            actor.setDestId(npc.fetchId());
            npc.setLocZ(actor.fetchLocZ()); // TODO: Remove, uber hack...
            session.dataSend(ServerResponse.destSelected(actor.fetchDestId(), actor.fetchLevel() - npc.fetchLevel()));
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
