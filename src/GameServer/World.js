let GameServerResponse = invoke('GameServer/GameServerResponse');
let Utils = invoke('Utils');

class World {
    static initialize() {
        this.players = [];
        this.npcs    = [];
        this.items   = [];
    }

    static insertNpcs(session) {
        for (let i = 0; i < 20; i++) { // 20 Mobs
            const coords = Utils.createRandomCoordinates(41819.5, 41705.1, 1200);
            const hp = 10 + Utils.createRandomNumber(85);
            const heading = Utils.createRandomNumber(65536);

            this.npcs.push({
                id: 1000000 + i,
                npcId: 1000000 + 440,
                name: 'Elder Brown Fox',
                type: NpcType.MONSTER,
                attackable: true,
                hp: hp,
                maxHp: 95,
                collisionRadius: 9.5,
                collisionHeight: 10,
                x: coords.x,
                y: coords.y,
                z: -3492,
                heading: heading
            });

            session.sendData(
                GameServerResponse.npcInfo(this.npcs[i])
            );
        }
    }

    static insertItems(session) {
        for (let i = 0; i < 100; i++) {
            const coords = Utils.createRandomCoordinates(41819.5, 41705.1, 1500);

            this.items.push({
                id: 2000100 + i,
                itemId: 426,
                x: coords.x,
                y: coords.y,
                z: -3492
            });

            session.sendData(
                GameServerResponse.spawnItem(this.items[i])
            );
        }
    }

    // Items

    static fetchItem(id) {
        return new Promise((success, fail) => {
            let item = this.items.find(obj => obj.id === id);
            return item ? success(item) : fail();
        });
    }

    // Npc

    static fetchNpcWithId(id) {
        return new Promise((success, fail) => {
            let npc = this.npcs.find(obj => obj.id === id);
            return npc ? success(npc) : fail();
        });
    }

    static removeNpcWithId(session, id) {
        session.sendData(
            GameServerResponse.die(id)
        );

        // Delete NPC from world
        setTimeout(() => {
            this.npcs = this.npcs.filter(obj => obj.id !== id);
            session.sendData(
                GameServerResponse.deleteObject(id)
            );
        }, 5000);
    }

    // Players

    static insertPlayer(session) {
        // Residue?
        this.removePlayer(session.player.id);

        this.players.push({
            socket: session.socket,
            player: session.player
        });
    }

    static removePlayer(id) {
        this.players = this.players.filter(obj =>
            obj.player.id !== id
        );
    }

    static fetchPlayer(id) {
        return this.players.find(obj =>
            obj.player.id === id
        );
    }
}

module.exports = World;
