// Module imports
let db = require('mariadb');
let fs = require('fs');

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
            fatalError('DB:: failed to create connection');
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

    static addNewCharacter(username, data, classInfo) {
        return this.conn.query('\
            INSERT INTO characters (username, name, raceId, classId, level, maxHp, hp, maxMp, mp, exp, sp, karma, gender, face, hairStyle, hairColor, x, y, z)\
            VALUES ("' + username + '", "' + data.name + '", ' + data.raceId + ', ' + data.classId + ', 1, ' + classInfo.stats.maxHp + ', 48, ' + classInfo.stats.maxMp + ', ' + classInfo.stats.maxMp + ', 0, 0, 0, ' + data.gender + ', ' + data.face + ', ' + data.hairStyle + ', ' + data.hairColor + ', 43648, 40352, -3430)\
        ');
    }

    // Constant information

    static fetchClassInformation(classId) {
        const path = 'GameServer/Data/Classes';

        return new Promise((success, fail) => {
            fs.readdir(process.cwd() + '/src/' + path, (error, files) => {
                let result = files.find(text =>
                    text.includes('[' + classId + ']')
                );

                return result ? success(invoke(path + '/' + result)) : fail();
            });
        });
    }
}

module.exports = Database;
