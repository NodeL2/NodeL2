let GameServerResponse = invoke('GameServer/GameServerResponse');

class World {
    static initialize() {
        this.npc = [];
    }

    static insertNpcs(session) {
        for (let i = 0; i < 20; i++) { // 20 Mobs

            let centerX = 41819.5;
            let centerY = 41705.1;
            let R = 1500;

            let r = R * Math.sqrt(Math.random());
            let theta = Math.random() * 2 * Math.PI;
            let x = centerX + r * Math.cos(theta);
            let y = centerY + r * Math.sin(theta);
            let heading = Math.floor(Math.random() * 65536);
            let hp = Math.floor(Math.random() * 95)

            this.npc.push({
                id: 1000000 + i,
                npcId: 1000000 + 440,
                name: 'Elder Brown Fox',
                type: NpcType.MONSTER,
                attackable: true,
                hp: hp,
                maxHp: 95,
                collisionRadius: 9.5,
                collisionHeight: 10,
                x: x,
                y: y,
                z: -3492,
                heading: heading
            });

            session.sendData(
                GameServerResponse.npcInfo(this.npc[i]), false
            );
        }

        for (let i = 0; i < 100; i++) {

            let centerX = 41819.5;
            let centerY = 41705.1;
            let R = 1500;

            let r = R * Math.sqrt(Math.random());
            let theta = Math.random() * 2 * Math.PI;
            let x = centerX + r * Math.cos(theta);
            let y = centerY + r * Math.sin(theta);

            session.sendData(
                GameServerResponse.spawnItem(i, x, y), false
            );
        }
    }

    static fetchNpcWithId(id) {
        return this.npc.find(obj => obj.id === id);
    }

    static removeNpcWithId(session, id) {
        this.npc = this.npc.filter(obj => obj.id !== id);

        session.sendData(
            GameServerResponse.die(id), false
        );

        // Delete NPC from world
        setTimeout(() => {
            session.sendData(
                GameServerResponse.deleteObject(id), false
            );
        }, 5000);
    }
}

module.exports = World;
