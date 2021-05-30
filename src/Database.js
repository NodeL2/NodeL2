let mariadb = require('mariadb/callback');

// User define
let Config = invoke('Config');

class Database {
    static connection() {
        this.conn = mariadb.createConnection({
            host: Config.database.host,
            port: Config.database.port,
            user: Config.database.user,
            password: Config.database.password,
            database: Config.database.name
        });

        this.conn.connect(err => {
            if (err) {
                return console.log('DB:: Failed to create connection');
            }
        });
    }

    static sqlQuery(query) {
        return new Promise((success, failure) => {
            this.conn.query(query, (err, results, fields) => {
                if (err) {
                    return failure(err);
                }

                return success(results);
            });
        });
    }

    static getAccountPassword(username) {
        return this.sqlQuery(
            'SELECT password FROM accounts WHERE username = "' + username + '" LIMIT 1'
        );
    }

    static getCharacters(username) {
        return this.sqlQuery(
            'SELECT * FROM characters WHERE username = "' + username + '"'
        );
    }
}

module.exports = Database;
