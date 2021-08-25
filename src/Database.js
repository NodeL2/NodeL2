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
        })
    }

    static fetchAccountPassword(username) {
        return this.conn.query(
            sql.select('accounts', 'password').where({
                username: username
            }).limit(1).text
        );
    }

    static fetchCharacters(username) {
        return this.conn.query(
            sql.select('characters', '*').where({
                username: username
            }).text
        );
    }

    static addNewAccount(username, password) {
        return this.conn.query(
            sql.insert('accounts', {
                username: username,
                password: password
            }).text
        );
    }

    static addNewCharacter(username, data, classInfo) {
        return this.conn.query(
            sql.insert('characters', {
                 username: username,
                     name: data.name,
                   raceId: data.raceId,
                  classId: data.classId,
                    level: 1,
                    maxHp: classInfo.stats.maxHp,
                       hp: 48,
                    maxMp: classInfo.stats.maxMp,
                       mp: classInfo.stats.maxMp,
                      exp: 0,
                       sp: 0,
                    karma: 0,
                   gender: data.gender,
                     face: data.face,
                   hairId: data.hairId,
                hairColor: data.hairColor,
                        x: 43648,
                        y: 40352,
                        z:-3430
            }).text
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
