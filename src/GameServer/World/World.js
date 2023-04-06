const World = {
    init() {
        this.user  = { sessions : [] };
        this.npc   = { spawns   : [], nextId: 1000000 };
        this.items = { spawns   : [], nextId: 5000000 };

        World.spawnNpcs();
    },

    insertUser(session) {
        const exists = this.user.sessions.find((ob) => session.fetchAccountId() === ob.fetchAccountId());
        if (exists) {
            exists.socket.resetAndDestroy();
            this.user.sessions = this.user.sessions.filter(ob => session.fetchAccountId() === ob.fetchAccountId());
            this.user.sessions.push(session);
        }
        else {
            this.user.sessions.push(session);
        }
    },

    fetchNpc        : invoke(path.world + 'FetchNpc'),
    spawnNpcs       : invoke(path.world + 'SpawnNpcs'),
    removeNpc       : invoke(path.world + 'RemoveNpc'),
    npcRewards      : invoke(path.world + 'NpcRewards'),
    npcTalk         : invoke(path.world + 'NpcTalk'),
    npcTalkResponse : invoke(path.world + 'NpcTalkResponse'),

    fetchItem       : invoke(path.world + 'fetchItem'),
    spawnItem       : invoke(path.world + 'SpawnItem'),
    pickupItem      : invoke(path.world + 'PickupItem'),
    purchaseItem    : invoke(path.world + 'PurchaseItem'),
    purchaseItems   : invoke(path.world + 'PurchaseItems')
};

module.exports = World;
