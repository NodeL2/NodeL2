const Npc       = invoke('GameServer/Npc/Npc');
const DataCache = invoke('GameServer/DataCache');
const Formulas  = invoke('GameServer/Formulas');

function createNpc(world, npc, coords) {
    world.npc.spawns.push(
        new Npc(world.npc.nextId++, { ...utils.crushOb(npc), ...coords })
    );
}

function spawnNpcs() {
    DataCache.npcSpawns.forEach((item) => {
        const bounds = item.bounds;

        item.spawns.forEach((spawn) => {
            DataCache.fetchNpcFromSelfId(spawn.selfId, (npc) => {
                let coords = [];

                bounds.forEach((bound) => {
                    coords.push([bound.locX, bound.locY]);
                });

                for (let i = 0; i < spawn.total; i++) {
                    if (utils.size(spawn.coords) > 0) { // Explicit location
                        spawn.coords.forEach((info) => {
                            createNpc(this, npc, {
                                locX: info.locX, locY: info.locY, locZ: info.locZ, head: info.head || utils.randomNumber(65536),
                            });
                        });
                    }
                    else { // Random location within bounds
                        const pos = Formulas.createRandomVertexPosition(coords);
                        createNpc(this, npc, {
                            locX: pos[0], locY: pos[1], locZ: bounds[0].maxZ, head: utils.randomNumber(65536),
                        });
                    }
                }
            });
        });
    });

    utils.infoSuccess('Spawns', '%d Npcs & Monsters', this.npc.spawns.length);
}

module.exports = spawnNpcs;
