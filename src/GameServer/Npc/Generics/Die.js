const ServerResponse = invoke('GameServer/Network/Response');

function die(session, actor, npc) {
    npc.destructor(session);
    npc.state.setDead(true);
    session.dataSend(ServerResponse.die(npc.fetchId()), npc);
    invoke(path.actor).npcDied(session, actor, npc);
}

module.exports = die;
