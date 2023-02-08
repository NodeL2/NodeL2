const SQL = require('like-sql'), builder = new SQL();

const Database = {
    init: (callback) => {
        callback();
    }
};

module.exports = Database;
