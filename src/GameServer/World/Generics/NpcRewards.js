const DataCache = invoke('GameServer/DataCache');
const SpeckMath = invoke('GameServer/SpeckMath');

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
                        const point = new SpeckMath.Circle(npc.fetchLocX(), npc.fetchLocY(), 50).createPointWithin();
                        this.spawnItem(session, item.selfId, utils.oneFromSpan(item.min, item.max), {
                            ...point.coords(), locZ: npc.fetchLocZ() - 10
                        });
                        break;
                    }
                }
            }
        });
    });
}

module.exports = npcRewards;
