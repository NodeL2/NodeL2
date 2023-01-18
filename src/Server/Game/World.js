class World {
    static init() {
        this.npcDatabase = invoke(process.cwd() + '/data/Npc/30300-30399');
        this.npcs = [];
    }

    static insertNpcs(session) {
        console.info(this.npcDatabase);
    }
}

module.exports = World;
