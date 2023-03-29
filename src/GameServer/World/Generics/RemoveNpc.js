const ServerResponse = invoke('GameServer/Network/Response');

function removeNpc(session, npc) {
    const npcId = npc.fetchId();
    this.npcRewards(session, npc);

    // Delete npc from world
    setTimeout(() => {
        this.npc.spawns = this.npc.spawns.filter(ob => ob.fetchId() !== npcId);
        session.dataSend(
            ServerResponse.deleteOb(npcId)
        );
    }, 7000); // TODO: Depends if npc is spoiled
}

module.exports = removeNpc;
