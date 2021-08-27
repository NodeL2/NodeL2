let ServerResponse = invoke('GameServer/Response');
let Utils          = invoke('Utils');

class World {
    static init() {
        this.npcDatabase = invoke('GameServer/Data/Npcs/Npcs.json');
        this.npcs = [];
    }

    static insertNpcs(session) {
        for (let i = 0; i < 20; i++) { // 20 Mobs
            const coords = Utils.createRandomCoordinates(41819.5, 41705.1, 1200);
            const number = Utils.createRandomNumber(this.npcDatabase.length);
            const hp = 10 + Utils.createRandomNumber(85);
            const heading = Utils.createRandomNumber(65536);

            this.npcs.push({
                id: 1000000 + i,
                npcId: this.npcDatabase[number].id,
                name: this.npcDatabase[number].name,
                type:  this.npcDatabase[number].class,
                attackable: true,
                hp: hp,
                maxHp: 95,
                collisionRadius: this.npcDatabase[number].collision_radius,
                collisionHeight: this.npcDatabase[number].collision_height,
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
