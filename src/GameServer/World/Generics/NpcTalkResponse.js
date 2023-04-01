const ServerResponse = invoke('GameServer/Network/Response');
const Item           = invoke('GameServer/Item/Item');
const DataCache      = invoke('GameServer/DataCache');
const Formulas       = invoke('GameServer/Formulas');

function npcTalkResponse(session, data) {
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
                utils.infoWarn('GameServer', 'html file "%s" does not exist', filename);
            }
            break;

        case 'teleport':
            {
                const coords = DataCache.teleports.find((ob) => ob.id === Number(parts[1]))?.spawns;
                coords ? invoke(path.actor).teleportTo(session, session.actor, coords[0]) : null;
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

                invoke(path.actor).teleportTo(session, session.actor, coords);
            }
            break;

        case 'admin-teleport-random':
            {
                const count    = utils.size(DataCache.npcSpawns);
                const selected = DataCache.npcSpawns[utils.randomNumber(count)];

                const coords = selected.bounds.map((bound) => {
                    return [bound.locX, bound.locY];
                });

                const pos = Formulas.createRandomVertexPoint(coords);
                invoke(path.actor).teleportTo(session, session.actor, {
                    locX: pos[0], locY: pos[1], locZ: selected.bounds[0].maxZ, head: utils.randomNumber(65536),
                });
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
                    ServerResponse.purchaseList(list, session.actor.backpack.fetchTotalAdena())
                );
            }
            break;

        default:
            utils.infoWarn('GameServer', 'unknown NPC response "%s"', parts[0]);
            break;
    }
}

module.exports = npcTalkResponse;
