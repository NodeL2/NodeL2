const World = invoke('GameServer/World');

function npcDied(session, actor, npc) {
    const Generics = invoke('GameServer/Actor/Generics');

    World.removeNpc(session, npc);
    Generics.abortCombatState(session, actor);

    if (!actor.isDead()) {
        Generics.experienceReward(session, actor, npc.fetchRewardExp(), npc.fetchRewardSp());
    }
}

module.exports = npcDied;
