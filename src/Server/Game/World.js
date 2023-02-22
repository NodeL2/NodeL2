const ServerResponse = invoke('Server/Game/Network/Response');
const Npc            = invoke('Server/Game/Actor/Npc');
const DataCache      = invoke('Server/Game/DataCache');

const World = {
    init() {
        this.npc = {
            spawns: [], nextId: 1000000
        };

        DataCache.npcs.forEach((npc) => {
            const spawns = DataCache.npcSpawns.filter(ob => ob.selfId === npc.selfId)[0]?.spawns ?? [];
            spawns.forEach((coords) => {
                this.npc.spawns.push(
                    new Npc(this.npc.nextId++, utils.crushOb({ ...npc, ...coords }) )
                );
            });
        });

        console.info(this.npc.spawns);
    },

    insertNpcs(session) {
        this.npc.spawns.forEach((npc) => {
            session.dataSend(ServerResponse.npcInfo(npc));
        });
    },

    fetchNpcWithId(id) {
        return new Promise((success, fail) => {
            let npc = this.npc.spawns.find(ob => ob.fetchId() === id);
            return npc ? success(npc) : fail();
        });
    }
};

module.exports = World;
