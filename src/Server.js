let AuthServer = require('./AuthServer/AuthServer');

require('./Database').initDatabase(() => {
    new AuthServer();
});
