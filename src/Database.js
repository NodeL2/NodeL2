// Module imports
let db = require('mariadb');

class Database {
    static init(config, callback) {
        db.createConnection({
            host     : config.host,
            port     : config.port,
            user     : config.user,
            password : config.password,
            database : config.db
        })
        .then(conn => {
            console.log('DB:: connection successful');
            this.conn = conn;
            callback();
        })
        .catch(error => {
            console.log('DB:: failed to create connection');
        })
    }

    static fetchAccountPassword(username) {
        return this.conn.query(
            'SELECT password FROM accounts WHERE username = "' + username + '" LIMIT 1'
        );
    }

    static fetchCharacters(username) {
        return this.conn.query(
            'SELECT * FROM characters WHERE username = "' + username + '"'
        );
    }
}

module.exports = Database;
