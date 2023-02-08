require('./Globals');

// User imports
const Database = invoke('Database');
const Utils    = invoke('Utils');

console.info('\n\
    + ================================== \n\
    # Server Name: ......... NodeL2      \n\
    # Build Revision: ...... %s          \n\
    # Chronicle: ........... C2 [485]    \n\
    # Build date: .......... %s          \n\
    # NodeJS version: ...... %s          \n\
    + ================================== \n\
', Utils.buildNumber(), Utils.currentDate(), Utils.nodeVersion());

Database.init(() => {
    infoSuccess('The callback oh!');
});
