const ServerResponse = invoke('GameServer/Network/Response');
const Npc            = invoke('GameServer/Instance/Npc');
const Item           = invoke('GameServer/Instance/Item');
const DataCache      = invoke('GameServer/DataCache');
const ConsoleText    = invoke('GameServer/ConsoleText');
const Formulas       = invoke('GameServer/Formulas');
const Database       = invoke('Database');

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
        const npcId = npc.fetchId();
        this.npcRewards(session, npc);

        // Delete npc from world
        setTimeout(() => {
            this.npc.spawns = this.npc.spawns.filter(ob => ob.fetchId() !== npcId);
            session.dataSend(
                ServerResponse.deleteOb(npcId)
            );
        }, 7000); // TODO: Depends if npc is spoiled
    },

    npcRewards(session, npc) {
        const rewards = DataCache.npcRewards.find(ob => ob.selfId === npc.fetchSelfId())?.rewards ?? [];
        rewards.forEach((reward) => {
            const optn = options.default.General;

            if (Math.random() <= (reward.chance * optn.dropChanceRate) / 100) { // TODO: Remove locZ hack at some point
                const coords = Formulas.createRandomCoordinates(npc.fetchLocX(), npc.fetchLocY(), 50);
                coords.locZ  = npc.fetchLocZ() - 10;
                this.spawnItem(session, reward.selfId, utils.oneFromSpan(reward.min, reward.max), coords);
            }
        });
    },

    spawnItem(session, selfId, amount, coords) {
        DataCache.fetchItemFromSelfId(selfId, (itemDetails) => {
            const item = new Item(this.items.nextId++, { ...utils.crushOb(itemDetails), ...coords });
            item.setAmount(amount);
            this.items.spawns.push(item);
            session.dataSend(ServerResponse.spawnItem(item));
        });
    },

    npcTalk(session, npc) {
        const path = 'data/Html/';
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
                    const path = 'data/Html/';
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
                    const coords = DataCache.teleports.find((ob) => ob.id === Number(parts[1]))?.spawns;
                    coords ? session.actor.teleportTo(coords[0]) : null;
                }
                break;

            case 'admin-teleport':
                {
                    const coords = {
                        locX: Number(parts[1]),
                        locY: Number(parts[2]),
                        locZ: Number(parts[3]),
                        head: session.actor.fetchHead()
                    };

                    session.actor.teleportTo(coords);
                }
                break;

            case 'admin-shop':
                {
                    let list = [];

                    DataCache.adminShop[parts[1]].forEach((selfId) => {
                        DataCache.fetchItemFromSelfId(selfId, (item) => {
                            item.template.price = 0; // Admin prices :)
                            list.push(new Item(this.items.nextId++, utils.crushOb(item)));
                        });
                    });

                    session.dataSend(
                        ServerResponse.purchaseList(list)
                    );
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
    },

    pickupItemFromGround(session, actor, item) {
        const id     = item.fetchId();
        const selfId = item.fetchSelfId();
        const amount = item.fetchAmount();

        this.items.spawns = this.items.spawns.filter((ob) => ob.fetchId() !== id);
        session.dataSend(ServerResponse.deleteOb(id));
        this.purchaseItem(session, selfId, amount);

        const textName   = { kind: ConsoleText.kind.  item, value: selfId };
        const textAmount = { kind: ConsoleText.kind.number, value: amount };
        amount > 1 ? (selfId === 57 ? ConsoleText.transmit(session, ConsoleText.caption.pickupAdenaAmount, [textAmount]) : ConsoleText.transmit(session, ConsoleText.caption.pickupAmountOf, [textName, textAmount])) : ConsoleText.transmit(session, ConsoleText.caption.pickup, [textName]);
    },

    purchaseItems(session, items) {
        let timer = 0; // TODO: Bullcrap

        items.forEach((item) => {
            setTimeout(() => {
                this.purchaseItem(session, item.selfId, item.amount);
            }, timer += 100);
        });
    },

    purchaseItem(session, selfId, amount) {
        const actor = session.actor;
        const backpack = actor.backpack;

        backpack.stackableExists(selfId).then((item) => { // Stackable item exists
            const itemId = item.fetchId();
            const total  = item.fetchAmount() + amount;

            Database.updateItemAmount(actor.fetchId(), itemId, total).then(() => {
                backpack.updateAmount(itemId, total);
                session.dataSend(ServerResponse.userInfo(session.actor));
                session.dataSend(ServerResponse.itemsList(backpack.fetchItems()));
            });
        }).catch(() => { // New item
            DataCache.fetchItemFromSelfId(selfId, (item) => {
                Database.setItem(actor.fetchId(), {
                      selfId: item.selfId,
                        name: item.template.name,
                      amount: amount,
                    equipped: false,
                        slot: item.etc.slot
                }).then((packet) => {
                    backpack.insertItem(Number(packet.insertId), selfId, { amount: amount });
                    session.dataSend(ServerResponse.userInfo(session.actor));
                    session.dataSend(ServerResponse.itemsList(backpack.fetchItems()));
                });
            });
        });
    }
};

module.exports = World;
