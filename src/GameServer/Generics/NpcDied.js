const World = invoke('GameServer/World');

function npcDied(session, actor, npc) {
    World.removeNpc(session, npc);

    if (!actor.isDead()) {
        invoke('GameServer/Generics').experienceReward(session, actor, npc.fetchRewardExp(), npc.fetchRewardSp());
    }
}

module.exports = npcDied;
