let GameServerResponse = invoke('GameServer/GameServerResponse');

class World {
    static initialize() {
        this.npc = [];
    }

    static insertNpcs(session) {
        for (let i = 0; i < 20; i++) { // 20 Mobs

            let centerX = 41819.5;
            let centerY = 41705.1;
            let R = 1000;

            let r = R * Math.sqrt(Math.random());
            let theta = Math.random() * 2 * Math.PI;
            let x = centerX + r * Math.cos(theta);
            let y = centerY + r * Math.sin(theta);
            let heading = Math.floor(Math.random() * 65536);
            let hp = Math.floor(Math.random() * 95)

            this.npc.push({
                id: 1000000 + i,
                npcId: 1000000 + 432,
                attackable: 1,
                x: x,
                y: y,
                z: -3492,
                heading: heading,
                collisionRadius: 5.0,
                collisionHeight: 4.5,
                maxHp: 95,
                hp: hp,
                name: 'Elpy'
            });
        }

        for (let i = 0; i < 20; i++) {
            session.sendData(
                GameServerResponse.npcInfo(this.npc[i]), false
            );
        }
    }

    static fetchNpcWithId(id) {
        return this.npc.find(o => o.id === id);
    }
}

module.exports = World;
