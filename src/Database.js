const SQL = require('like-sql'), builder = new SQL();

let conn;

const Database = {
    init: (callback) => {
        const optn = options.connection.Database;

        require('mariadb').createConnection({
            host     : optn.hostname,
            port     : optn.port,
            user     : optn.user,
            password : optn.password,
            database : optn.databaseName

        }).then((instance) => {
            utils.infoSuccess('DB:: connected');
            conn = instance;
            callback();

        }).catch(error => {
            utils.infoFail('DB:: failed(%d) -> %s', error.errno, error.text);
        });
    }
};

module.exports = Database;
