const validateSchema = require('jsonschema').validate;

const DataCache = {
    init: () => {
        utils.infoSuccess('Cache:: started');
        const path = '../data/';

        DataCache.classTemplates = validateModel(path + 'Templates/templates');
        DataCache.npcs           = validateModel(path + 'Npcs/7370-7370');
        DataCache.skills         = validateModel(path + 'Skills/skills');
        DataCache.skillTree      = validateModel(path + 'Skills/Tree/tree');
        DataCache.items          = validateModel(path + 'Items/items');
        DataCache.itemsNewbie    = validateModel(path + 'Items/Newbie/newbie');
    },

    fetchSkillDetailsFromId(id) {
        return new Promise((success, fail) => {
            let skill = DataCache.skills.find(ob => ob.id === id);
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
