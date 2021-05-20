let net = require('net');
let initLS = require('./InitLS');

let ls = {
    host: '127.0.0.1',
    port: 2106
};

class Server {
    constructor() {
        net.createServer(this.onSocket).listen(ls.port, ls.host, () => {
            console.info('LS listening on ' + ls.host + ':' + ls.port);
        });
    }

    onSocket(socket) {
        console.info('Connected to LS -> ' + socket.remoteAddress + ':' + socket.remotePort);

        // Callback: Received data
        socket.on('data', (data) => {
            console.info('Connection data from %s: %j', socket.remoteAddress, data);
        });

        // Callback: Connection closed
        socket.on('close', () => {
            console.log('Connection from %s closed', socket.remoteAddress);
        });

        // Callback: Unknown error
        socket.on('error', (error) => {
            console.info('Connection %s error: %s', socket.remoteAddress, error.message);
        });

        socket.setEncoding('binary');
        socket.write(initLS());
    }
}

new Server();
