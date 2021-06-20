// Module imports
let net = require('net');

class GameServer {
    constructor(config) {
        net.createServer(this.onSocket).listen(config.port, config.host, () => {
            console.log('GameServer:: initialised for %s:%d', config.host, config.port);
        });
    }

    onSocket(socket) {
        console.log(
            'GameServer:: new connection from %s:%d', socket.remoteAddress, socket.remotePort
        );
    }
}

module.exports = GameServer;
