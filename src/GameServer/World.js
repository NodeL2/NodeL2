const ServerResponse = invoke('GameServer/Network/Response');
const Npc            = invoke('GameServer/Instance/Npc');
const Item           = invoke('GameServer/Instance/Item');
const DataCache      = invoke('GameServer/DataCache');
const Formulas       = invoke('GameServer/Formulas');

const World = {
    init() {
        this.user  = { sessions : [] };
        this.npc   = { spawns   : [], nextId: 1000000 };
        this.items = { spawns   : [], nextId: 5000000 };

        DataCache.npcs.forEach((npc) => {
            const spawns = DataCache.npcSpawns.filter(ob => ob.selfId === npc.selfId)[0]?.spawns ?? [];
            spawns.forEach((coords) => {
                this.npc.spawns.push(
                    new Npc(this.npc.nextId++, utils.crushOb({ ...npc, ...coords }))
                );
            });
        });

        utils.infoSuccess('Spawns     :: %d Npcs & Monsters', this.npc.spawns.length);
    },

    insertUser(session) {
        this.user.sessions.push(session);
    },

    fetchNpc(id) {
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
            if (Math.random() <= reward.chance / 100) { // TODO: Remove locZ hack at some point
                const coords = Formulas.createRandomCoordinates(npc.fetchLocX(), npc.fetchLocY(), 50);
                coords.locZ  = npc.fetchLocZ() - 10;
                this.spawnItem(session, reward.selfId, coords);
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

    spawnItem(session, selfId, coords) {
        const itemLookup = (id, success) => {
            const item = { ...DataCache.items.find((ob) => ob.selfId === id) };
            item ? success(item) : utils.infoWarn('GameServer:: unknown Item Id %d', id);
        };

        itemLookup(selfId, (itemDetails) => {
            const item = new Item(this.items.nextId++, { ...utils.crushOb(itemDetails), ...coords });
            this.items.spawns.push(item);
            session.dataSend(ServerResponse.spawnItem(item));
        });
    },

    npcTalk(session, npc) {
        const path = 'data/Html/Default/';
        const filename = path + npc.fetchSelfId() + '.html';

        session.dataSend(
            ServerResponse.npcHtml(npc.fetchId(), utils.parseRawFile(
                utils.fileExists(filename) ? filename : path + 'noquest.html'
            ))
        );
    },

    npcTalkResponse(session, data) {
        let parts = data.link.split(' ') ?? [];

        switch (parts[0]) {
            case 'html':
                {
                    const path = 'data/Html/Default/';
                    const filename = path + parts[1] + '.html';

                    if (utils.fileExists(filename)) {
                        session.dataSend(
                            ServerResponse.npcHtml(7146, utils.parseRawFile(filename))
                        );
                        return;
                    }
                    utils.infoWarn('GameServer :: html file "%s" does not exist', filename);
                }
                break;

            case 'teleport':
                {
                    const spawns = DataCache.teleports.find((ob) => ob.id === Number(parts[1]))?.spawns;
                    if (spawns) { session.actor.teleportTo(session, spawns[0]); }
                }
                break;

            case 'admin-teleport':
                {
                    session.actor.teleportTo(session, {
                        locX: parts[1], locY: parts[2], locZ: parts[3], head: session.actor.fetchHead()
                    });
                }
                break;

            default:
                utils.infoWarn('GameServer :: unknown NPC response "%s"', parts[0]);
                break;
        }
    },

    fetchItem(id) {
        return new Promise((success, fail) => {
            let item = this.items.spawns.find(ob => ob.fetchId() === id);
            return item ? success(item) : fail();
        });
    }
};

module.exports = World;
