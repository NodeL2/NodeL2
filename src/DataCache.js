const validateSchema = require('jsonschema').validate;

const DataCache = {
    init: () => {
        utils.infoSuccess('Cache:: started');
        const path = '../data/';
        
        DataCache.classTemplates = validateModel(path + 'Templates/templates');
        DataCache.npcs           = validateModel(path + 'Npcs/7370-7370');
    }
};

function validateModel(filepath) {
    const path   = require('path').dirname(filepath);
    const model  = require(filepath);
    const result = validateSchema(model, require(path + '/.schema'));

    if (!result.valid) {
        utils.infoFail('Cache:: failed to parse "%s" -> %s', filepath, result.errors[0].stack);
    }
    
    return model;
}

module.exports = DataCache;
