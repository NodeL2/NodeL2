const SQL = require('like-sql'), builder = new SQL();

let conn;

const Database = {
    init: (callback) => {
        const optn = options.connection.Database;

        require('mariadb').createConnection({
            host     : optn.hostname,
            port     : optn.port,
            user     : optn.user,
            password : optn.password,
            database : optn.databaseName

        }).then((instance) => {
            utils.infoSuccess('DB:: connected');
            conn = instance;
            callback();

        }).catch(error => {
            utils.infoFail('DB:: failed(%d) -> %s', error.errno, error.text);
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

    // Returns the `Characters` stored on a user's account
    fetchCharacters: (username) => {
        return Database.execute(
            builder.select('characters', ['*'], 'username = ?', username)
        );
    },

    // Reads the `Base Stats` for a specific Class ID
    fetchClassInformation: (classId) => {
        const DataCache = invoke('DataCache');
        return new Promise((success, fail) => {
            let model = DataCache.classTemplates.find(ob => ob.classId === classId);
            return model ? success(model) : fail();
        });
    }
};

module.exports = Database;
