const World = invoke('GameServer/World/World');

function npcDied(session, actor, npc) {
    const Generics = invoke(path.actor);

    World.removeNpc(session, npc);
    Generics.abortCombatState(session, actor);

    if (!actor.isDead()) {
        Generics.experienceReward(session, actor, npc.fetchRewardExp(), npc.fetchRewardSp());
    }
}

module.exports = npcDied;
