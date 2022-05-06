const SQL = require('like-sql'), builder = new SQL();
let conn;

const Database = {
    init: (callback) => {
        let optn = invoke('Config').database;

        require('mariadb').createConnection({
            host     : optn.hostname,
            port     : optn.port,
            user     : optn.user,
            password : optn.password,
            database : optn.name

        }).then((instance) => {
            console.log('DB:: connected');
            conn = instance;
            callback();

        }).catch(error => {
            console.log('DB:: failed(%d) -> %s', error.errno, error.text);
        });
    },

    execute: (sql) => {
        return conn.query(sql[0], sql[1]);
    },

    // Creates a new User Account in the Database with provided credentials
    createAccount: (username, password) => {
        return Database.execute(
            builder.insert('accounts', {
                username: username,
                password: password
            })
        );
    },

    // Gets the Password from a provided Username account
    fetchUserPassword: (username) => {
        return Database.execute(
            builder.selectOne('accounts', ['password'], 'username = ?', username)
        );
    },

    // Gets the Characters defined on a user's account
    fetchCharacters: (username) => {
        return Database.execute(
            builder.select('characters', ['*'], 'username = ?', username)
        );
    },

    // Gets the Base Stats for a specific Class ID
    fetchClassInformation: (classId) => {
        let path = process.cwd() + '/data/Classes';

        return new Promise((success, fail) => {
            require('fs').readdir(path, (error, files) => {
                let result = files.find(text =>
                    text.includes('[' + classId + ']')
                );

                return result ? success(require(path + '/' + result)) : fail();
            });
        });
    }
};

module.exports = Database;
