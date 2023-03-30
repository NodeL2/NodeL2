const Npc       = invoke('GameServer/Npc/Npc');
const DataCache = invoke('GameServer/DataCache');

function spawnNpcs() {
//    DataCache.npcs.forEach((npc) => {
//        const spawns = DataCache.npcSpawns.filter(ob => ob.selfId === npc.selfId)[0]?.spawns ?? [];
//        spawns.forEach((coords) => {
//            this.npc.spawns.push(
//                new Npc(this.npc.nextId++, utils.crushOb({ ...npc, ...coords }))
//            );
//        });
//    });
//
//    utils.infoSuccess('Spawns', '%d Npcs & Monsters', this.npc.spawns.length);

    DataCache.npcSpawns.forEach((item) => {
        const bounds = item.bounds;
        const spawns = item.spawns;

        spawns.forEach((spawn) => {
            const npc = DataCache.npcs.find((ob) => ob.selfId === spawn.selfId);
            if (npc && spawn.coords[0]) {
                const coords = {
                    locX: spawn.coords[0].locX,
                    locY: spawn.coords[0].locY,
                    locZ: spawn.coords[0].minZ,
                }
                this.npc.spawns.push(
                    new Npc(this.npc.nextId++, utils.crushOb({ ...npc, ...coords }))
                );
            }
        });
    });

    utils.infoSuccess('Spawns', '%d Npcs & Monsters', this.npc.spawns.length);
}

module.exports = spawnNpcs;
