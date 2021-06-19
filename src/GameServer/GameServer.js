let Config = invoke('Config');

// Module imports
let net = require('net');

class GameServer {
    constructor() {

        let host = Config.gameServer.host;
        let port = Config.gameServer.port;

        this.server = net.createServer(this.onSocket).listen(port, host, () => {
            console.log('GameServer:: initialised for %s:%d', host, port);
        });
    }

    onSocket(socket) {
        console.log(
            'GameServer:: new connection from %s:%d', socket.remoteAddress, socket.remotePort
        );
    }
}

module.exports = GameServer;
