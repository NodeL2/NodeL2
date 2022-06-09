const SQL = require('like-sql'), builder = new SQL();

let conn;

const Database = {
    init: (callback) => {
        const { database } = invoke('Config');

        require('mariadb').createConnection({
            host     : database.hostname,
            port     : database.port,
            user     : database.user,
            password : database.password,
            database : database.name

        }).then((instance) => {
            console.info('DB:: connected');
            conn = instance;
            callback();

        }).catch(error => {
            infoFail('DB:: failed(%d) -> %s', error.errno, error.text);
        });
    },

    execute: (sql) => {
        return conn.query(sql[0], sql[1]);
    },

    // Creates a `New Account` in the database with provided credentials
    createAccount: (username, password) => {
        return Database.execute(
            builder.insert('accounts', {
                username: username,
                password: password
            })
        );
    },

    // Returns the `Password` from a provided account
    fetchUserPassword: (username) => {
        return Database.execute(
            builder.selectOne('accounts', ['password'], 'username = ?', username)
        );
    },

    // Checks if provided `Character Name` is taken
    fetchCharacterWithName: (name) => {
        return Database.execute(
            builder.selectOne('characters', ['id'], 'name = ?', name)
        );
    },

    // Returns the `Characters` stored on a user's account
    fetchCharacters: (username) => {
        return Database.execute(
            builder.select('characters', ['*'], 'username = ?', username)
        );
    },

    // Reads the `Base Stats` for a specific Class ID
    fetchClassInformation: (classId) => {
        const path = process.cwd() + '/data/Classes';

        return new Promise((success, fail) => {
            require('fs').readdir(path, (error, files) => {
                const result = files.find(text =>
                    text.includes('[' + classId + ']')
                );

                return result ? success(require(path + '/' + result)) : fail();
            });
        });
    },

    // Stores a new `Character` in database with provided details
    createCharacter(username, data, classInfo) {
        return Database.execute(
            builder.insert('characters', {
                 username: username,
                     name: data.name, title: 'NodeL2 Champion',
                     race: data.race,
                  classId: data.classId,
                    maxHp: classInfo.stats.maxHp,
                    maxMp: classInfo.stats.maxMp,
                    maxCp: classInfo.stats.maxCp,
                      sex: data.sex,
                     face: data.face,
                     hair: data.hair,
                hairColor: data.hairColor,
                     locX: 43648, // TODO: Depends on race and class
                     locY: 40352, // TODO: "
                     locZ:-3430   // TODO: "
            })
        );
    },

    deleteCharacter(username, name) {
        return Database.execute(
            builder.delete('characters', 'username = ? AND name = ?', username, name)
        );
    }
};

module.exports = Database;
