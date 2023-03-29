const Npc       = invoke('GameServer/Npc/Npc');
const DataCache = invoke('GameServer/DataCache');

function spawnNpcs() {
    DataCache.npcs.forEach((npc) => {
        const spawns = DataCache.npcSpawns.filter(ob => ob.selfId === npc.selfId)[0]?.spawns ?? [];
        spawns.forEach((coords) => {
            this.npc.spawns.push(
                new Npc(this.npc.nextId++, utils.crushOb({ ...npc, ...coords }))
            );
        });
    });

    utils.infoSuccess('Spawns', '%d Npcs & Monsters', this.npc.spawns.length);
}

module.exports = spawnNpcs;
