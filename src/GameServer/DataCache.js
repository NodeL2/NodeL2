const validateSchema = require('jsonschema').validate;

const DataCache = {
    init: () => {
        const path = '../data/';

        DataCache.classTemplates = validateModel(path + 'Templates/templates');
        DataCache.newbieSpawns   = validateModel(path + 'Templates/Spawns/spawns');
        DataCache.newbieItems    = validateModel(path + 'Templates/Items/items');
        DataCache.experience     = validateModel(path + 'Templates/Experience/experience');

        DataCache.skillTree      = validateModel(path + 'Skills/Tree/tree');
        DataCache.npcs           = validateModel(path + 'Npcs/1-7400');
        DataCache.npcSpawns      = validateModel(path + 'Npcs/Spawns/spawns');

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
    },

    fetchSkillDetailsFromId(selfId) {
        return new Promise((success, fail) => {
            let skill = DataCache.skills.find(ob => ob.selfId === selfId);
            return (skill) ? success(skill) : fail();
        });
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
