const validateSchema = require('jsonschema').validate;

const DataCache = {
    init: () => {
        const path = '../data/';

        DataCache.classTemplates  = validateModel(path + 'Templates/templates');
        DataCache.newbieItems     = validateModel(path + 'Templates/Items/items');
        DataCache.newbieShortcuts = validateModel(path + 'Templates/Shortcuts/shortcuts');
        DataCache.newbieSpawns    = validateModel(path + 'Templates/Spawns/spawns');
        DataCache.experience      = validateModel(path + 'Templates/Experience/experience');
        DataCache.revitalize      = validateModel(path + 'Templates/Revitalize/revitalize');
        DataCache.skillTree       = validateModel(path + 'Skills/Tree/tree');
        DataCache.npcs            = validateModel(path + 'Npcs/npcs');
        DataCache.npcSpawns       = validateModel(path + 'Npcs/Spawns/spawns');
        DataCache.npcRewards      = validateModel(path + 'Npcs/Rewards/rewards');
        DataCache.teleports       = validateModel(path + 'Teleports/teleports');
        DataCache.adminShop       = validateModel(path + 'Admin/Shop/shop');

        DataCache.items = [
            ...validateModel(path + 'Items/Armors/armors'),
            ...validateModel(path + 'Items/Weapons/weapons'),
            ...validateModel(path + 'Items/Others/others')
        ];

        DataCache.skills = [
            ...validateModel(path + 'Skills/Active/active'),
            ...validateModel(path + 'Skills/Passive/passive'),
            ...validateModel(path + 'Skills/Switch/switch')
        ];

        utils.infoSuccess('Datapack   :: cached');
    },

    fetchItemFromSelfId(selfId, callback) {
        const item = structuredClone(DataCache.items.find((ob) => ob.selfId === selfId));
        item ? callback(item) : utils.infoWarn('Datapack   :: unknown Item Id %d', selfId);
    },

    fetchSkillFromSelfId(selfId, callback) {
        const item = structuredClone(DataCache.skills.find((ob) => ob.selfId === selfId));
        item ? callback(item) : utils.infoWarn('Datapack   :: unknown Skill Id %d', selfId);
    }
};

function validateModel(filepath) {
    const path   = require('path').dirname(filepath);
    const model  = invoke(filepath);
    const result = validateSchema(model, invoke(path + '/.schema'));

    if (!result.valid) {
        utils.infoWarn('Cache      :: failed to parse "%s" -> %s', filepath, result.errors[0].stack);
    }
    
    return model;
}

module.exports = DataCache;
