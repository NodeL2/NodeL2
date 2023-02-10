const SQL = require('like-sql'), builder = new SQL();

let conn;

const Database = {
    init: (callback) => {
        const { Database: optn } = invoke('Config');

        require('mariadb').createConnection({
            host     : optn.hostname,
            port     : optn.port,
            user     : optn.user,
            password : optn.password,
            database : optn.databaseName

        }).then((instance) => {
            infoSuccess('DB:: connected');
            conn = instance;
            callback();

        }).catch(error => {
            infoFail('DB:: failed(%d) -> %s', error.errno, error.text);
        });
    }
};

module.exports = Database;
