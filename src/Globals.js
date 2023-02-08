// Override `require` for more convenient referrals
global.invoke = (module) => {
    return require(__dirname + '/' + module);
};

// Generic success prompt
global.infoSuccess = (...params) => {
    console.info('\x1b[32m' + require('util').format(...params) + '\x1b[0m');
};

//const jsonSchema = require('jsonschema');
//
//let sampleModel = {
//    id: 1,
//    class: "Dark Elf"
//};
//
//let result = jsonSchema.validate(sampleModel, require('./schema.json'));
//
//console.info(result.valid);
