require('./Global');

// User imports
const AuthSession = invoke('AuthenticationServer/Session');
const GameSession = invoke('GameServer/Session');
const World       = invoke('GameServer/World/World');
const DataCache   = invoke('GameServer/DataCache');
const Database    = invoke('Database');
const Server      = invoke('Server');

console.info('\n\
    + ================================== \n\
    # Server Name: ......... NodeL2      \n\
    # Build Revision: ...... %s          \n\
    # Chronicle: ........... C2 [485]    \n\
    # Build date: .......... %s          \n\
    # NodeJS version: ...... %s          \n\
    + ================================== \n\
', utils.buildNumber(), utils.currentDate(), utils.nodeVersion());

// Startup procedure, init `World` & `Data`, then `AuthServer`, finally `GameServer`
Database.init(() => {
    DataCache.init();
        World.init();

    new Server('AuthServer', options.default.AuthServer, (socket) => {
        return new AuthSession(socket);
    });

    new Server('GameServer', options.default.GameServer, (socket) => {
        return new GameSession(socket);
    });
});

//let npcs = require('./hi');
//let data = [];
//
//for (let npc of npcs) {
//    let model = {
//        "selfId": npc.id,
//        "template": { "kind": npc.type, "name": npc.name, "title": "", "level": npc.level, "undead": npc.undying === 0 ? false : true, "hostile": npc.agro_range },
//        "base": { "str": npc.str, "dex": npc.dex, "con": npc.con, "int": npc.int, "wit": npc.wit, "men": npc.men },
//        "stats": { "pAtk": npc.base_physical_attack, "pAtkRnd": npc.base_rand_dam, "pDef": npc.base_defend, "mAtk": npc.base_magic_attack, "mDef": npc.base_magic_defend, "crit": npc.critical, "accur": npc.physical_hit_modify, "atkSpd": npc.base_attack_speed, "castSpd": 333, "atkRadius": npc.base_attack_range },
//        "speed": { "walk": npc.ground_low[0], "run": npc.ground_high[0] },
//        "vitals": { "maxHp": npc.org_hp, "maxMp": npc.org_mp, "revHp": npc.org_hp_regen, "revMp": npc.org_mp_regen, "corpseTime": npc.corpse_time },
//        "collision": { "radius": npc.collision_radius, "size": npc.collision_height },
//        "equipment": { "weapon": npc.slot_rhand, "shield": npc.slot_lhand,"reuseTime": npc.base_reuse_delay },
//        "clan": { "clanName": npc.clan, "helpRadius": npc.clan_help_range },
//        "rewards": { "exp": npc.acquire_exp_rate, "sp": npc.acquire_sp }
//    };
//
//    data.push(model);
//}
//
//require('fs').writeFile('output.json', JSON.stringify(data), 'utf8', () => {});
