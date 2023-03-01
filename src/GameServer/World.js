const ServerResponse = invoke('GameServer/Network/Response');
const Npc            = invoke('GameServer/Instance/Npc');
const Item           = invoke('GameServer/Instance/Item');
const DataCache      = invoke('GameServer/DataCache');
const Formulas       = invoke('GameServer/Formulas');

const World = {
    init() {
        this.user = {
            sessions: []
        };

        this.npc = {
            spawns: [], nextId: 1000000
        };

        this.items = {
            spawns: [], nextId: 5000000
        };

        DataCache.npcs.forEach((npc) => {
            const spawns = DataCache.npcSpawns.filter(ob => ob.selfId === npc.selfId)[0]?.spawns ?? [];
            spawns.forEach((coords) => {
                this.npc.spawns.push(
                    new Npc(this.npc.nextId++, utils.crushOb({ ...npc, ...coords }) )
                );
            });
        });
    },

    insertUser(session) {
        this.user.sessions.push(session);
    },

    fetchNpcWithId(id) {
        return new Promise((success, fail) => {
            let npc = this.npc.spawns.find(ob => ob.fetchId() === id);
            return npc ? success(npc) : fail();
        });
    },

    removeNpc(session, npc) {
        // Npc death
        const npcId = npc.fetchId();
        session.dataSend(ServerResponse.die(npcId));
        npc.destructor();

        // Npc drops
        const rewards = DataCache.npcRewards.find(ob => ob.selfId === npc.fetchSelfId())?.rewards ?? [];
        rewards.forEach((reward) => {
            if (Math.random() <= reward.chance / 100) { // TODO: Can't understand locZ in this case
                const coords = Formulas.createRandomCoordinates(npc.fetchLocX(), npc.fetchLocY(), 100);
                const item = new Item(this.items.nextId++, { selfId: reward.selfId, ...coords });
                this.items.spawns.push(item);
                session.dataSend(ServerResponse.spawnItem(item));
            }
        });

        // Delete npc from world
        setTimeout(() => {
            this.npc.spawns = this.npc.spawns.filter(ob => ob.fetchId() !== npcId);
            session.dataSend(
                ServerResponse.deleteOb(npcId)
            );
        }, 7000); // TODO: Depends if npc is spoiled
    },

    npcTalk(session, npc) {
        const path = 'data/Html/Default/';
        const filename = path + npc.fetchSelfId() + '.html';

        session.dataSend(
            ServerResponse.npcHtml(npc.fetchId(), utils.parseRawFile(
                utils.fileExists(filename) ? filename : path + 'noquest.html'
            ))
        );
    }
};

module.exports = World;
