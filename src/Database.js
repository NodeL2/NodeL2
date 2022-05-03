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

    // Creates a new User Account in the Database with provided credentials
    createAccount: (username, password) => {
        const [sql, values] = builder.insert('accounts', {
            username: username, password: password
        });
        return conn.query(
            sql, values
        );
    },

    // Gets the User Password from provided Username account
    fetchUserPassword: (username) => {
        const [sql, values] = builder.selectOne('accounts', ['password'], 'username = ?', username);
        return conn.query(
            sql, values
        );
    },

    fetchCharacters: (username) => {
        const [sql, values] = builder.selectOne('characters', ['*'], 'username = ?', username);
        return conn.query(
            sql, values
        );
    }
};

module.exports = Database;
