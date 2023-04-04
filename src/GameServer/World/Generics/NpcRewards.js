const DataCache = invoke('GameServer/DataCache');
const Formulas  = invoke('GameServer/Formulas');

function npcRewards(session, npc) {
    DataCache.fetchNpcRewardsFromSelfId(npc.fetchSelfId(), (result) => {
        const rewards = result.rewards ?? [];
        const optn    = options.default.General;

        rewards.forEach((reward) => {
            if (Math.random() * 100 <= reward.overall * optn.dropChanceRate) {
                let number = Math.random() * 100;
                let rewardPartition = 0;

                for (const item of reward.items) {
                    rewardPartition += item.chance;

                    if (number <= rewardPartition) { // TODO: Remove locZ hack at some point
                        const coords = Formulas.createRandomCoordinates(npc.fetchLocX(), npc.fetchLocY(), 50);
                        coords.locZ  = npc.fetchLocZ() - 10;
                        this.spawnItem(session, item.selfId, utils.oneFromSpan(item.min, item.max), coords);
                        break;
                    }
                }
            }
        });
    });
}

module.exports = npcRewards;
