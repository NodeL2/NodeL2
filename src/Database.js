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

    static getBaseClass(classId) {
        return this.sqlQuery(
            'SELECT * FROM classes WHERE class_id = "' + classId + '" LIMIT 1'
        );
    }

    static addNewCharacter(username, data, stats) {
        return this.sqlQuery('\
            INSERT INTO characters (username, name, race_id, class_id, level, max_hp, hp, max_mp, mp, exp, sp, karma, gender, face, hair_style, hair_color, x, y, z)\
            VALUES ("' + username + '", "' + data.name + '", ' + data.race + ', ' + data.classId + ', 1, ' + stats.hp + ', 48, ' + stats.mp + ', ' + stats.mp + ', 0, 0, 0, ' + data.gender + ', ' + data.face + ', ' + data.hairStyle + ', ' + data.hairColor + ', 43648, 40352, -3430)\
        ');
    }

    static getInventoryItems(characterId) {
        return this.sqlQuery(
            'SELECT * FROM items WHERE character_id = "' + characterId + '"'
        );
    }
}

module.exports = Database;
