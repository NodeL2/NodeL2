const ServerResponse = invoke('Server/Game/Network/Response');
const Npc            = invoke('Server/Game/Actor/Npc');
const DataCache      = invoke('Server/Game/DataCache');

const World = {
    init() {
        this.npcs = [];

        for (let i in DataCache.npcs) {
            this.npcs.push(
                new Npc(Number(i) + 1000000, utils.crushOb(DataCache.npcs[i]))
            );
        }
    },

    insertNpcs(session) {
        this.npcs.forEach((npc) => {
            session.dataSend(ServerResponse.npcInfo(npc));
        });
    },

    fetchNpcWithId(id) {
        return new Promise((success, fail) => {
            let npc = this.npcs.find(ob => ob.fetchId() === id);
            return npc ? success(npc) : fail();
        });
    }
};

module.exports = World;
