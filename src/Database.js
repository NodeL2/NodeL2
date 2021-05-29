let mariadb = require('mariadb/callback');

// User define
let Config = invoke('Config');

class Database {
    static connection() {
        this.conn = mariadb.createConnection({
            host: Config.database.host,
            database: Config.database.name,
            user: Config.database.username,
            password: Config.database.password,
            port: Config.database.port
        });

        this.conn.connect(err => {
            if (err) {
                return console.log('DB:: Failed to create connection');
            }
        });
    }

    static getAccountPassword(username) {
        return new Promise((success, failure) => {
            const sql = 'SELECT password FROM accounts WHERE username = "' + username + '" LIMIT 1';
            this.conn.query(sql, (err, results, fields) => {
                if (err) {
                    return failure(err);
                }

                return success(results);
            });
        });
    }

    static getCharacters(username) {
        return new Promise((success, failure) => {
            const sql = 'SELECT * FROM characters WHERE username = "' + username + '"';
            this.conn.query(sql, (err, results, fields) => {
                if (err) {
                    return failure(err);
                }

                return success(results);
            });
        });
    }
}

module.exports = Database;
