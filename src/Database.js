const SQL = require('like-sql'), builder = new SQL();

let conn;

const Database = {
    init: (optn, callback) => {
        require('mariadb').createConnection({
            host     : optn.Hostname,
            port     : optn.Port,
            user     : optn.User,
            password : optn.Password,
            database : optn.DatabaseName

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
