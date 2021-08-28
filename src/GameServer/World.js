let ServerResponse = invoke('GameServer/Response');
let Utils          = invoke('Utils');

class World {
    static init() {
        this.npcDatabase = invoke('GameServer/Data/Npcs/Npcs.json');
        this.npcs = [];
    }

    static insertNpcs(session) {
        for (let i = 0; i < 20; i++) { // 20 Mobs
            const coords  = Utils.createRandomCoordinates(41819.5, 41705.1, 1200);
            const hp      = Utils.createRandomNumber(85) + 10;
            const heading = Utils.createRandomNumber(65536);

            let npc = this.npcDatabase[
                Utils.createRandomNumber(this.npcDatabase.length)
            ];

            this.npcs.push({
                        id: 1000000 + i,
                     npcId: npc.id,
                      name: npc.name,
                      type: npc.class,
                attackable: true,
                        hp: hp,
                     maxHp: 95,
                    radius: npc.collision_radius,
                    height: npc.collision_height,
                         x: coords.x,
                         y: coords.y,
                         z: -3492,
                   heading: heading
            });

            session.sendData(
                ServerResponse.npcInfo(this.npcs[i])
            );
        }
    }
}

module.exports = World;
