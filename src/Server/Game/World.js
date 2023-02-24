const ServerResponse = invoke('Server/Game/Network/Response');
const Npc            = invoke('Server/Game/Creature/Npc/Npc');
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
    },

    removeNpc(session, npc) {
        npc.destructor();

        const npcId = npc.fetchId();
        session.dataSend(ServerResponse.die(npcId));

        // Delete npc from world
        setTimeout(() => {
            this.npc.spawns = this.npc.spawns.filter(ob => ob.fetchId() !== npcId);
            session.dataSend(
                ServerResponse.deleteOb(npcId)
            );
        }, 5000);
    }
};

module.exports = World;
