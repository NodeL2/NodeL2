let conn, sql = require('sql-query').Query();

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
        return conn.query(
            sql.insert().into('accounts').set({
                username: username,
                password: password
            }).build()
        );
    },

    // Gets the User Password from provided Username account
    fetchUserPassword: (username) => {
        return conn.query(
            sql.select().from('accounts').select('password').where({
                username: username
            }).limit(1).build()
        );
    }
};

module.exports = Database;
