const ServerResponse = invoke('Server/Game/Response');

class World {
    static init() {
        this.npcs = invoke('../data/Npc/30300-30399');
    }

    static insertNpcs(session) {
        for (let i = 0; i < this.npcs.length; i++) {
            session.dataSend(
                ServerResponse.npcInfo(this.npcs[i])
            );
        }
    }
}

module.exports = World;
