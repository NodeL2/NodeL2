let net = require('net');

let ls = {
    host: '127.0.0.1',
    port: 2106
};

class Server {
    constructor() {
        console.info('Constructor')
    }

    start() {
        net.createServer(this.socket).listen(ls.port, ls.host, () => {
            console.info('LS listening on ' + ls.host + ':' + ls.port);
        });
    }

    socket(socket) {
        console.info('Connected to LS -> ' + socket.remoteAddress + ':' + socket.remotePort);
    }
}

module.exports = new Server();
