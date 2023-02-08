// Override `require` for more convenient referrals
global.invoke = (module) => {
    return require(__dirname + '/' + module);
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
