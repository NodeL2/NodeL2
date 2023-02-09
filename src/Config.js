const Config = require('js-ini').parse(
    invoke('Utils').parseRawFile('./config/connection.ini')
);

module.exports = Config;
