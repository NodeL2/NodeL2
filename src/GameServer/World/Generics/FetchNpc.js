function fetchNpc(id) {
    return new Promise((success, fail) => {
        let npc = this.npc.spawns.find(ob => ob.fetchId() === id);
        return npc ? success(npc) : fail();
    });
}

module.exports = fetchNpc;
