let conn;

exports.initDatabase = (callback) => {
    let { optnDatabase } = invoke('Config');

    require('mariadb').createConnection({
        host     : optnDatabase.hostname,
        port     : optnDatabase.port,
        user     : optnDatabase.user,
        password : optnDatabase.password,
        database : optnDatabase.name

    }).then(instance => {
        console.log('DB:: Connected');
        conn = instance;
        callback();

    }).catch(error => {
        console.log('DB:: Failed(%d) -> %s', error.errno, error.text);
    });
}
