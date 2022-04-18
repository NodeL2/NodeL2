let conn;

exports.initDatabase = (callback) => {
    let { optnDatabase: optn } = invoke('Config');

    require('mariadb').createConnection({
        host     : optn.hostname,
        port     : optn.port,
        user     : optn.user,
        password : optn.password,
        database : optn.name

    }).then(instance => {
        console.log('DB:: Connected');
        conn = instance;
        callback();

    }).catch(error => {
        console.log('DB:: Failed(%d) -> %s', error.errno, error.text);
    });
};
