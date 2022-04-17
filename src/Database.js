let { optnDatabase } = require('./Config');

let conn;

function initDatabase(callback) {
    require('mariadb').createConnection({
        host     : optnDatabase.hostname,
        port     : optnDatabase.port,
        user     : optnDatabase.user,
        password : optnDatabase.password,
        database : optnDatabase.name,
    }).then(instance => {
        console.log('DB:: Connected');
        conn = instance;
        callback();
    });
}

exports.initDatabase = initDatabase;
