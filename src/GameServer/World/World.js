const ServerResponse = invoke('GameServer/Network/Response');
const ConsoleText    = invoke('GameServer/ConsoleText');
const SpeckMath      = invoke('GameServer/SpeckMath');

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

    fetchUser(id) {
        return new Promise((success, fail) => {
            let user = this.user.sessions.find((ob) => id === ob.actor?.fetchId());
            return user.actor ? success(user.actor) : fail();
        });
    },

    fetchVisibleUsers(session, creature) {
        const actorArea = new SpeckMath.Circle(creature.fetchLocX(), creature.fetchLocY(), 5000);
        return this.user.sessions.filter((ob) => session !== ob && actorArea.contains(new SpeckMath.Point(ob.actor?.fetchLocX() ?? 0, ob.actor?.fetchLocY() ?? 0))) ?? [];
    },

    askForTeamUp(session, actor, data) {
        ConsoleText.transmit(session, ConsoleText.caption.waitForResponse);
        this.fetchUser(data.id).then((user) => {
            user.session.dataSendToMe(ServerResponse.askForTeamUp(actor.fetchId(), data.distribution));
        });
    },

    answerForTeamUp(session, actor, data) {
        console.info(data);
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
