const ServerResponse = invoke('Server/Game/Network/Response');
const Npc            = invoke('Server/Game/Actor/Npc');
const DataCache      = invoke('Server/Game/DataCache');

const World = {
    init() {
        this.npcs = [];

        for (let i in DataCache.npcs) {
            this.npcs.push(
                new Npc(i + 1000000, utils.crushOb(DataCache.npcs[i]))
            );
        }
    },

    insertNpcs(session) {
        this.npcs.forEach((npc) => {
            session.dataSend(ServerResponse.npcInfo(npc));
        });
    }
};

module.exports = World;
