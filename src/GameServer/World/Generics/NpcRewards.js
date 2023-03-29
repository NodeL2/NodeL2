const DataCache = invoke('GameServer/DataCache');
const Formulas  = invoke('GameServer/Formulas');

function npcRewards(session, npc) {
    DataCache.fetchNpcRewardsFromSelfId(npc.fetchSelfId(), (result) => {
        const rewards = result.rewards ?? [];
        const optn    = options.default.General;

        rewards.forEach((reward) => {
            if (Math.random() <= (reward.chance * optn.dropChanceRate) / 100) { // TODO: Remove locZ hack at some point
                const coords = Formulas.createRandomCoordinates(npc.fetchLocX(), npc.fetchLocY(), 50);
                coords.locZ  = npc.fetchLocZ() - 10;
                this.spawnItem(session, reward.selfId, utils.oneFromSpan(reward.min, reward.max), coords);
            }
        });
    });
}

module.exports = npcRewards;
