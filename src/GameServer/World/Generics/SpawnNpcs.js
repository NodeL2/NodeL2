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
        const spawns = item.spawns;

        spawns.forEach((spawn) => {
            DataCache.fetchNpcFromSelfId(spawn.selfId, (npc) => {
                if (utils.size(spawn.coords) > 0) { // Explicit location
                    spawn.coords.forEach((info) => {
                        createNpc(this, npc, {
                            locX: info.locX, locY: info.locY, locZ: info.locZ, head: info.head || utils.randomNumber(65536),
                        });
                    });
                }
                else { // Random location within bounds
                    let coords = [];

                    bounds.forEach((bound) => {
                        coords.push({ x: bound.locX, y: bound.locY });
                    });

                    let vertices = utils.fetchEarcutVertices(coords);

                    if (vertices === undefined) {
                        utils.infoWarn('Datapack', 'cannot extract Vertices from "' + item.selfId + '"');
                        return;
                    }

                    for (let i = 0, cnt = 0; i < spawn.total; i++, cnt = (cnt === utils.size(vertices) - 1) ? 0 : cnt + 1) {
                        const pos = Formulas.createRandomCoordsForVertex(
                            vertices[cnt][0], vertices[cnt][1], vertices[cnt][2]
                        );

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
