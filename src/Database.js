let fs  = require('fs');
let sql = require('sql-query-generator');

class Database {
    static init(config, callback) {
        require('mariadb').createConnection({
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
        });
    }

    static completeQuery(query) {
        return this.conn.query(
            invoke('Utils').replaceSQLParams(query.text), query.values
        );
    }

    static fetchAccountPassword(username) {
        return this.completeQuery(
            sql.select('accounts', 'password').where({
                username: username
            }).limit(1)
        );
    }

    static fetchCharacters(username) {
        return this.completeQuery(
            sql.select('characters', '*').where({
                username: username
            })
        );
    }

    static addNewAccount(username, password) {
        return this.completeQuery(
            sql.insert('accounts', {
                username: username,
                password: password
            })
        );
    }

    static addNewCharacter(username, data, classInfo) {
        return this.completeQuery(
            sql.insert('characters', {
                 username: username,
                     name: data.name,
                   raceId: data.raceId,
                  classId: data.classId,
                    level: 1,
                    maxHp: classInfo.stats.maxHp,
                       hp: classInfo.stats.maxHp,
                    maxMp: classInfo.stats.maxMp,
                       mp: classInfo.stats.maxMp,
                      exp: 0,
                       sp: 0,
                    karma: 0,
                   gender: data.gender,
                     face: data.face,
                   hairId: data.hairId,
                hairColor: data.hairColor,
                        x: 43648, // TODO: Depends on race and class
                        y: 40352, // TODO: Depends on race and class
                        z:-3430   // TODO: Depends on race and class
            })
        );
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
