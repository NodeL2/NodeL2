const ServerResponse = invoke('GameServer/Network/Response');

function removeNpc(session, npc) {
    const npcId = npc.fetchId();
    this.npcRewards(session, npc);

    // Delete NPC from world
    setTimeout(() => {
        this.npc.spawns = this.npc.spawns.filter(ob => ob.fetchId() !== npcId);
        session.dataSend(
            ServerResponse.deleteOb(npcId)
        );
    }, npc.fetchCorpseTime()); // TODO: Depends if NPC is spoiled too
}

module.exports = removeNpc;
