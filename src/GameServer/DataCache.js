const validateSchema = require('jsonschema').validate;

const DataCache = {
    init: () => {
        const path = '../data/';

        DataCache.classTemplates = validateModel(path + 'Templates/templates');
        DataCache.newbieSpawns   = validateModel(path + 'Templates/Spawns/spawns');
        DataCache.newbieItems    = validateModel(path + 'Templates/Items/items');
        DataCache.experience     = validateModel(path + 'Templates/Experience/experience');

        DataCache.skillTree      = validateModel(path + 'Skills/Tree/tree');
        DataCache.npcs           = validateModel(path + 'Npcs/npcs');
        DataCache.npcSpawns      = validateModel(path + 'Npcs/Spawns/spawns');
        DataCache.npcRewards     = validateModel(path + 'Npcs/Rewards/rewards');

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

        utils.infoSuccess('Datapack:: cached');
    }
};

function validateModel(filepath) {
    const path   = require('path').dirname(filepath);
    const model  = invoke(filepath);
    const result = validateSchema(model, invoke(path + '/.schema'));

    if (!result.valid) {
        utils.infoWarn('Cache:: failed to parse "%s" -> %s', filepath, result.errors[0].stack);
    }
    
    return model;
}

module.exports = DataCache;
