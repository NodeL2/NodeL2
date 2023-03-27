const ServerResponse = invoke('GameServer/Network/Response');
const World          = invoke('GameServer/World');

function select(session, actor, data) {
    if (actor.fetchId() === data.id) { // Click on self
        actor.setDestId(actor.fetchId());
        session.dataSend(ServerResponse.destSelected(actor.fetchDestId()));
        return;
    }

    World.fetchNpc(data.id).then((npc) => {
        if (npc.fetchId() !== actor.fetchDestId()) { // First click on a Creature
            actor.setDestId(npc.fetchId());
            session.dataSend(ServerResponse.destSelected(actor.fetchDestId(), actor.fetchLevel() - npc.fetchLevel()));
            actor.statusUpdateVitals(npc);
        }
        else { // Second click on same Creature
            actor.attackRequest(data);
        }
    }).catch(() => {
        actor.pickupRequest(data);
    });
}

module.exports = select;
