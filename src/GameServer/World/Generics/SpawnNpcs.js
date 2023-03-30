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
                if (spawn.coords[0].head === 0) {
                    spawn.coords[0].head = utils.randomNumber(65536);
                }
                const coords = {
                    locX: spawn.coords[0].locX,
                    locY: spawn.coords[0].locY,
                    locZ: spawn.coords[0].locZ,
                    head: spawn.coords[0].head,
                }
                this.npc.spawns.push(
                    new Npc(this.npc.nextId++, utils.crushOb({ ...npc, ...coords }))
                );
            }
            else if (npc && bounds) {
                let coordinates = [];
                let locZ = 0;
                for (let bound of bounds) {
                    coordinates.push([bound.locX, bound.locY]);
                    locZ = bound.maxZ;
                }

                const randomPositionInPolygon = require('random-position-in-polygon');
                
                const polygon = {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            coordinates
                        ]
                    }
                };

                for (let i = 0; i < spawn.total; i++) {
                    const pos = randomPositionInPolygon(polygon);

                    const coords = {
                        locX: pos[0],
                        locY: pos[1],
                        locZ: locZ,
                        head: utils.randomNumber(65536),
                    }
                    this.npc.spawns.push(
                        new Npc(this.npc.nextId++, utils.crushOb({ ...npc, ...coords }))
                    );
                }
            }
        });
    });

    utils.infoSuccess('Spawns', '%d Npcs & Monsters', this.npc.spawns.length);
}

module.exports = spawnNpcs;
